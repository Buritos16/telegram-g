import express from 'express';
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'
import cors from 'cors'
import TelegramBot from 'node-telegram-bot-api'


const token = '5701264991:AAFa6BXjBWI5DR6OZr53OgXYUpsidA5WUEg'
export const bot = new TelegramBot(token, {polling: true})
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6Im0xcGY4OS0wMCIsInVzZXJfaWQiOiI3OTM4ODY5MTkyNyIsInNlY3JldCI6ImE3YTdiZmY4Yzc5OTA5ZjhjZDVmYjAxMGE1OWNlOGQ5MmM3ZGNhOTJkODA0OWRkM2ZhOTY0N2QwNzZiOTI3ZDgifX0=';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
const publicKey = '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPuajXbgBuWD7dsZ3zu2WJ5P5mSMPzbxuGLLAmHDD6AwbsshS42LLYp2BesJZBBHMr9BfLJRqvHGLq1UooF3rJGe8EHrZ6qkYLwKAEmyjQn';

let person = ''

const data = [
    {id: 'Valeriya', name: 'Валерия', title: 'Красивая девушка с выразительными скулами ☺', services: 'Классика\nАнал\nМинет\nМассаж\nБез презерватива / С презервативом', h: '2500', h2: '5000', night: '7500'},
    {id: 'Kseniya', name: 'Ксения', title: 'Милая, очаровательная девочка ❤\nКоторая всегда готова пошалить 🤫', services: 'Стандартный секс с резинкой 🥰\nСекс без резинки (любые позы)\nГлубокий минет (куни по желанию)', h: '3000', h2: '6000', night: '9000'},
    {id: 'Karina23', name: 'Карина', title: 'Молодая, красивая, заботливая, без болезней', services: '', h: '2500', h2: '5000', night: '7500'},
    {id: 'Alica', name: 'Алиса', title: 'Молодая, Красивая девушка', services: 'Класика, анал, минет', h: '2000', h2: '4000', night: '6000'},
    {id: 'Dariya', name: 'Дарья', title: 'Наш вечер поможет забыть тебе о всех твоих не насущих проблемах🥰🔥💖💖💖', services: 'Эротический массаж, минет, анал и классика😉🔥\nПо желанию доминирование и БДСМ🔞💕', h: '3000', h2: '6000', night: '9000'},
    {id: 'Angelina', name: 'Ангелина', title: 'Классический безопасный секс, Минет без резинки', services: 'Небезопасный секс, Анал, БДСМ', h: '3000', h2: '6000', night: '9000'},
    {id: 'Marina', name: 'Марина', title: 'Молодая, опытная.', services: 'Довожу до оргазма с кайфом, можем выпить)', h: '3000', h2: '6000', night: '9000'},
    {id: 'Lika', name: 'Лика', title: 'Молодая, красивая, есть справки о том что я здорова.', services: 'Ты запомнишь это время на долго 🔥', h: '2500', h2: '5000', night: '7500'},
    {id: 'Elena', name: 'Елена', title: 'Молодая, красивая, спортивная 😜', services: 'Классический секс (с защитой)\nАнальный секс, доплата (с защитой/без)\nОральный секс/минет', h: '7000', h2: '14000', night: '21000'},
    {id: 'Katya', name: 'Катя', title: 'Красотка, люблю брать в ротик, жду вас зайки😘', services: 'Люблю сосать😍, могу в любых позах😊', h: '2500', h2: '5000', night: '7500'},
    {id: 'Yulia', name: 'Юля', title: 'Молодая, красивая, экстравагантная', services: 'Минет, анал, все включено 💋🔥', h: '3000', h2: '6000', night: '9000'},
    {id: 'Sofa', name: 'София', title: 'Красивая, гибкая😜, многое умею😉', services: 'Классический секс (с защитой)\nМинет без резинки\nОстальное с доплатой', h: '2500', h2: '5000', night: '7500'},
    {id: 'Andgelika', name: 'Анджелика', title: 'Помогу тебе расслабиться, люблю поговорить☺', services: 'Обожаю делать минет🥰, позволяю делать всё💋', h: '3000', h2: '6000', night: '9000'},
]


const createPayment = async (value, account) => {
    const billId = qiwiApi.generateId();

    const params = {
        publicKey,
        amount: Number(value),
        billId: billId,
        successUrl: 'https://t.me/deluxe_girls_bot',
        account: account,
    };

    const link = await qiwiApi.createPaymentForm(params);
    return link;
}


bot.onText(/\/start/, function onStart(msg) {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Профиль 🔧', callback_data: 'profile'}, {
                    text: 'Анкеты 💚',
                    callback_data: 'girls'
                }, {text: 'О нас ❔', callback_data: 'about'}],
                [{text: 'Тех. Поддержка 🆘', url: 'https://t.me/DeluxeGirls_Support'}, {
                    text: 'Отзывы 🧾',
                    url: 'https://t.me/DeluxeGirlsReviews'
                }],
            ]
        },
        parse_mode: 'Markdown'
    };
    bot.sendMessage(msg.from.id, `*${msg.chat.first_name}*, добро пожаловать в *Deluxe Girls* 💚
    
У нас вы можете найти лучших девочек для интимных встреч.

Выдача адресов происходит круглосуточно через бота или, в крайних случаях, через куратора!

Внимательней проверяйте адрес Telegram, остерегайтесь мошенников, спасибо, что выбираете нас! 😎`, opts);
});


bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: [
                [{text: 'Профиль 🔧', callback_data: 'profile'}, {
                    text: 'Анкеты 💚',
                    callback_data: 'girls'
                }, {text: 'О нас ❔', callback_data: 'about'}],
                [{text: 'Тех. Поддержка 🆘', url: 'https://t.me/DeluxeGirls_Support'}, {
                    text: 'Отзывы 🧾',
                    url: 'https://t.me/DeluxeGirlsReviews'
                }],
            ]
        },
        parse_mode: 'Markdown'
    };
    let text;

    if (action === 'profile') {
        text = '👤 *Профиль*\n\n' +
            `❇️ Ваш Telegram ID: [[${msg.chat.id}]]\n` +
            `✳️ Ваш логин: [@${msg.chat.username}]`;
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendVideo(msg.chat.id, 'profile.mp4', {
            caption: text,
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Профиль 🔧', callback_data: 'profile'}, {
                        text: 'Анкеты 💚',
                        callback_data: 'girls'
                    }, {text: 'О нас ❔', callback_data: 'about'}],
                    [{text: 'Тех. Поддержка 🆘', url: 'https://t.me/DeluxeGirls_Support'}, {
                        text: 'Отзывы 🧾',
                        url: 'https://t.me/DeluxeGirlsReviews'
                    }],
                ]
            },
            parse_mode: 'Markdown'
        })
    }
    if (action === 'about') {
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendMessage(msg.chat.id, `❔ *О нас*

Наш проект создан для помощи в быстром и комфортном поиске.
Теперь не понадобятся значительные траты времени и сил для идеального досуга.

Структура нашего сервиса проектировалась для удобства работы каждого пользователя - теперь выбор может быть быстрее и проще.

Зачем вам дополнительные трудности на пути к удовольствию?

Отдельного внимания заслуживает то, что мы оставляем за клиентом право полной анонимности и не требуем персональные данные.`, opts);
    }

    if (action === 'girls') {
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendMessage(msg.chat.id, '💚 *Анкеты наших девочек*\n' +
            '\n' +
            '👋 Свободны сейчас: *13*',
            {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Валерия 24 Года', callback_data: 'Valeriya'}],
                        [{text: 'Ксения 22 Года', callback_data: 'Kseniya'}],
                        [{text: 'Карина 23 Года', callback_data: 'Karina23'}],
                        [{text: 'Алиса 19 Лет', callback_data: 'Alica'}],
                        [{text: 'Дарья 22 Года', callback_data: 'Dariya'}],
                        [{text: 'Ангелина 20 Лет', callback_data: 'Angelina'}],
                        [{text: 'Марина 18 Лет', callback_data: 'Marina'}],
                        [{text: 'Лика 21 Год', callback_data: 'Lika'}],
                        [{text: 'Елена 23 Года', callback_data: 'Elena'}],
                        [{text: 'Екатерина 22 Года', callback_data: 'Katya'}],
                        [{text: 'Юля 21 Год', callback_data: 'Yulia'}],
                        [{text: 'София 21 Год', callback_data: 'Sofa'}],
                        [{text: 'Анджелика 24 Года', callback_data: 'Andgelika'}],
                        [{text: 'Вернуться ↩️', callback_data: 'main'}],
                    ]
                },
                parse_mode: 'Markdown'
            })
    }

    if (action === 'main') {
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendMessage(msg.chat.id, `*${msg.chat.first_name}*, добро пожаловать в *Deluxe Girls* 💚
    
У нас вы можете найти лучших девочек для интимных встреч.

Выдача адресов происходит круглосуточно через бота или, в крайних случаях, через куратора!

Внимательней проверяйте адрес Telegram, остерегайтесь мошенников, спасибо, что выбираете нас! 😎`, opts);
    }

    if (action === 'Valeriya' || action === 'Kseniya' || action === 'Karina23' ||
        action === 'Alica' || action === 'Dariya' || action === 'Angelina' ||
        action === 'Marina' || action === 'Lika' || action === 'Elena' ||
        action === 'Katya' || action === 'Yulia' || action === 'Sofa' ||
        action === 'Andgelika') {
        person = action;
        bot.deleteMessage(msg.chat.id, msg.message_id)
        bot.sendPhoto(msg.chat.id, `images/${action}.jpg`, {
            caption: `🆔 Вы выбрали девушку *${data.find(x => x.id === action).name}*\n` +
                '\n' +
                `🌇 Час: *${data.find(x => x.id === action).h} RUB*\n` +
                `🏙️ 2 часа: *${data.find(x => x.id === action).h2} RUB*\n` +
                `🌃 Ночь: *${data.find(x => x.id === action).night} RUB*\n` +
                '\n' +
                '⚠️ Для оформления нажмите на кнопку *Оформить*',
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Описание', callback_data: 'description'}, {text: 'Услуги',callback_data: 'services'}],
                    [{text: 'Показать другое фото', callback_data: 'another'}],
                    [{text: 'Оформить', callback_data: 'buy'}, {text: 'Назад', callback_data: 'girls'}]
                ]
            },
            parse_mode: 'Markdown'
        })
    }

    if(action === 'another') {
        bot.answerCallbackQuery(callbackQuery.id, 'Только 1 фотография')
    }
    if(action === 'check') {
        bot.answerCallbackQuery(callbackQuery.id, 'Вы ещё не оплатили!')
    }
    if(action === 'description') {
        bot.answerCallbackQuery(callbackQuery.id, data.find(x => x.id === person).title, true)
    }
    if(action === 'services') {
        bot.answerCallbackQuery(callbackQuery.id, data.find(x => x.id === person).services, true)
    }
    if(action === 'buy') {

        const link = await createPayment(data.find(x => x.id === person).h, msg.chat.id)
        const link2 = await createPayment(data.find(x => x.id === person).h2, msg.chat.id)
        const link3 = await createPayment(data.find(x => x.id === person).night, msg.chat.id)

        bot.editMessageCaption(`🆔 Вы выбрали девушку *${data.find(x => x.id === person).name}*\n` +
            '\n' +
            `🌇 Час: *${data.find(x => x.id === person).h} RUB*\n` +
            `🏙️ 2 часа: *${data.find(x => x.id === person).h2} RUB*\n` +
            `🌃 Ночь: *${data.find(x => x.id === person).night} RUB*\n` +
            '\n' +
            '💳 Для оплаты картой нажмите на кнопку ниже и на странице оплаты выберите оплату картой' +
            '\n\n' +
            '⚠ Оплата заказа принимается *строго через бота*', {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Час', url: link}, {text: 'Два часа', url: link2}, {text: 'Ночь', url: link3}],
                    [{text: 'Проверить оплату', callback_data: 'check'}],
                    [{text: 'Назад', callback_data: 'girls'}]
                ]
            },
            parse_mode: 'Markdown'
        })
    }
});
bot.on("polling_error", console.log);
const app = express();
app.use(express.json());
app.use(cors());


app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
})