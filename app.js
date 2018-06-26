const TelegramBot = require('node-telegram-bot-api')

const rp = require('request-promise')


const token = '554374256:AAG7pt0934mekyHgvruAY8nYvES1oMHoKGk'

const bot = new TelegramBot(token, {polling: true})

const currency = {
  usd: {
    name: 'usd',
    id: '145',
  },
  eur: {
    name: 'eur',
    id: '292',
  },
  rub: {
    name: 'rub',
    id: '298',
  },
}
const fetchData = (currencydata, chatId) => {
  rp.get(`http://www.nbrb.by/API/ExRates/Rates/${currencydata.id}`)
    .then((resp) => {
      const cur = JSON.parse(resp)

      bot.sendMessage(chatId, `Курс ${currencydata.name.toUpperCase()}: ${cur.Cur_OfficialRate}`)
    })
    .catch((error) => {
      console.log(error)
    })
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id

  bot.sendMessage(chatId, 'Здравствуйте, выберите валюту:')
})
bot.on('message', (msg) => {
  const chatId = msg.chat.id

  console.log(msg.text.toString().toLowerCase())
  if (msg.text.toString().toLowerCase() in currency) {
    fetchData(currency[msg.text.toString().toLowerCase()], chatId)
  }
})
