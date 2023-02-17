import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: generatePrompt(animal),
    //   // prompt: `生成${animal}城市的温度数组`,
    //   temperature: 0.5,
    //   max_tokens: 200,
    //   top_p: 1.0,
    //   frequency_penalty: 0.8,
    //   presence_penalty: 0.0,
    // });
    // res.status(200).json({ result: completion.data.choices[0].text });

    // 生成图片
    const response = await openai.createImage({
      prompt: animal + '图片、地图、照片、人像',
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    console.log("响应的数据链接",image_url)
    res.status(200).json({ result: response.data.data[0].url })

  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  return `智能问答.
Animal: 世界之窗
Names: 位于深圳中心
Animal: 你好
Names: 我很好
Animal: 吃饭了没
Names: 你请我吃饭可以不
Animal: ${animal}
Names:`
}
