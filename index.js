const TelegramApi = require('node-telegram-bot-api');
const {gameOption,playAgain} = require ('./function.js');
const {name,TOKEN} = require ('./const.js')

const bot = new TelegramApi(TOKEN,{polling:true})

const startGame =  async(chatId) =>{
    await bot.sendMessage(chatId,`Сейчас я загадю число от 1 до 9,а ты попробуешь угадать`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId,`Отгадай!`,gameOption)

}

let chats = {}

const start =  ()=>{

 bot.setMyCommands([
    {command:'/start',description:'Приветствие'},
    {command:'/info',description:'Получить имформацию о пользователе'},
    {command:'/game',description:'Игра.Угадай число'}
  ])
    bot.on('message', async msq =>{
      const text = msq.text;
      const chatId = msq.chat.id;
      if(text === '/start'){
        await bot.sendSticker(chatId,'https://chpic.su/_data/stickers/v/vk_brock/vk_brock_001.webp')
        return bot.sendMessage(chatId,`Добро пожаловать в бот Alikoid`)
      }
     if(name.includes(text)){
       return bot.sendMessage(chatId,`Тебя зовут ${msq.from.first_name}`)
      }
      if(text === '/game'){
      return  startGame(chatId)
      }
     return bot.sendMessage(chatId,'Я тебя не совсем понимаю')
   })
   bot.on('callback_query',async msq =>{
    const data = msq.data;
    const chatId = msq.message.chat.id
    if(data === '/again'){
      return  startGame(chatId)
    }
    if(data === chats[chatId]){
       return await bot.sendMessage(chatId,`Молодец.Ты угадал это число  ${chats[chatId]}`,playAgain)
    }else{
       return  await bot.sendMessage(chatId,`Ты не угадал,это было число ${chats[chatId]}`,playAgain)
    }
   
   }) 
}
start()