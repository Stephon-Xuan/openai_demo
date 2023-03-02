const { Configuration, OpenAIApi } = require("openai");
const { program } = require('commander');
const chalk = require('chalk')
const dotenv = require("dotenv")
dotenv.config()
program.version('0.0.1');
const configuration = new Configuration({
  apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(configuration);

// 获取答案
const getAnswer = async (question) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `智能问答.
      Q: 世界之窗
      A: 位于深圳中心
      Q: 你好
      A: 我很好
      Q: 老板
      A: 股票和基金专家、前端大佬会js原理，请列举下他接下来要请我吃饭的一些庆祝相关的活动
      Q: 股票、基金
      A: 推荐购买的最近行情较好的股票和基金
      Q: 编程语言，React相关
      A: 使用说明，原理，未来扩展
      Q: 你是谁
      A: 考虑下自己来自那里，有什么作用
      Q: ${question}
      A:`,
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log(chalk.green("答案", response.data.choices[0].text))
  } catch (e) {
    console.error("无法回答...")
  }
}

program
  .option('--i')
  .option('--separator <char>');
program.parse();
const options = program.opts();
const limit = options.first ? 1 : undefined;
const question = program.args[0].split(options.separator, limit)[0]
console.log(chalk.blue("问题:",question))
getAnswer(question)