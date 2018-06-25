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
  rp(`http://www.nbrb.by/API/ExRates/Rates/${currencydata.id}`)
    .then((resp) => {
      const cur = JSON.parse(resp)

      bot.sendMessage(chatId, `Курс ${currencydata.name.toUpperCase()}: ${cur.Cur_OfficialRate}`)
    })
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id

  bot.sendMessage(chatId, 'Здравствуйте, выберите валюту:')
})
bot.on('message', (msg) => {
  const chatId = msg.chat.id

  if (msg.text.toString().toLowerCase().indexOf(currency.usd.name) === 0) {
    fetchData(currency.usd, chatId)
  }
  if (msg.text.toString().toLowerCase().indexOf(currency.eur.name) === 0) {
    fetchData(currency.eur, chatId)
  }
  if (msg.text.toString().toLowerCase().indexOf(currency.rub.name) === 0) {
    fetchData(currency.rub, chatId)
  }
})
