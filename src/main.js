import React, { useState, useEffect } from 'react';

const songLyrics = `Закрываю дверь квартиры
Отключаю все мобилы
Недоступна для дебилов
Потому что я влюбилась
В тебя-а-а, тупого наглеца
От чего же? От чего же?

Всё потому, что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
(Дура, дура, дура)

Я увидела твой взгляд
Заострённый на мне
Ты рукою помахал
Я помахала в ответ
Ты пошёл ко мне навстречу
Это было так глупо
Ведь за спиною моей
Стояла твоя подруга (Подруга)
You might also like
Втюрилась (Fell In Love)
Дора (mentaldora)
Седая ночь (Grey Night)
Юрий Шатунов (Yurii Shatunov)
Младшая сестра (Younger Sister)
Дора (mentaldora)

Всё потому, что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура

Ты позвал меня на встречу (А)
Ты позвал меня на встречу
Я готовилась весь вечер
Выбирала, что надеть мне
Истрепала свои нервы
Пришла, ждала почти два часа
И ты написал: «Сорри, я проспал»

Потому, что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура
Потому что Дора — дура
Супердура, Дора — дура`.split('\n');

const RainbowText = () => {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveLine((currentLine) => (currentLine + 1) % songLyrics.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
        textAlign: 'center',
        backgroundImage: `url(https://fonoteka.top/uploads/posts/2022-06/1656605801_23-phonoteka-org-p-dora-pevitsa-oboi-24.jpg)`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        padding: '50px 0' 
      }}>
      {songLyrics.map((line, index) => (
        <p
          key={index}
          className={`line ${activeLine === index ? 'active' : ''}`}
          style={{fontSize: '50px', margin: '0', padding: '0' }}
        >
          {line}
        </p>
      ))}
      <style jsx>{`
        @keyframes rainbowAnimation {
          0% {color: red;}
          14% {color: orange;}
          28% {color: yellow;}
          42% {color: green;}
          56% {color: blue;}
          70% {color: indigo;}
          84% {color: violet;}
          100% {color: red;}
        }
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .line {
          opacity: 1;
          transition: opacity 0.1s ease;
        }
        .active {
          animation: rainbowAnimation 4s linear infinite, floating 4s ease-in-out infinite;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default RainbowText;
