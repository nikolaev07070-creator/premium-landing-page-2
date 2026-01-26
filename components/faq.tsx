"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Какие документы нужны для аренды?",
    answer: "Для аренды автомобиля необходим паспорт гражданина РФ и водительское удостоверение со стажем вождения не менее 2 лет. Возраст водителя должен быть не менее 21 года.",
  },
  {
    question: "Можно ли арендовать авто без залога?",
    answer: "Залог является обязательным условием аренды и служит гарантией сохранности автомобиля. Сумма залога зависит от класса авто и полностью возвращается в течение 3 рабочих дней после окончания аренды при отсутствии повреждений.",
  },
  {
    question: "Что входит в стоимость аренды?",
    answer: "В стоимость аренды включено: ОСАГО, 300 км пробега в сутки, круглосуточная техподдержка. КАСКО с франшизой, детское кресло, доставка по городу и безлимитный пробег доступны как дополнительные опции.",
  },
  {
    question: "Можно ли выехать за пределы Краснодарского края?",
    answer: "Да, выезд за пределы края возможен по предварительному согласованию. Выезд за границу РФ запрещён. При поездках на дальние расстояния рекомендуем выбрать опцию безлимитного пробега.",
  },
  {
    question: "Как происходит возврат автомобиля?",
    answer: "Вернуть автомобиль можно в наш офис или заказать забор по адресу в Анапе. При возврате мы осматриваем автомобиль, фиксируем пробег и уровень топлива. Залог возвращается в течение 3 рабочих дней.",
  },
  {
    question: "Что делать в случае ДТП?",
    answer: "При ДТП необходимо вызвать ГИБДД, не перемещать автомобиль до приезда инспектора, сфотографировать повреждения и позвонить на нашу горячую линию. Мы поможем оформить все документы.",
  },
  {
    question: "Можно ли продлить аренду?",
    answer: "Да, продление возможно при наличии свободных дат. Свяжитесь с нами минимум за сутки до окончания аренды. Стоимость продления рассчитывается по актуальному тарифу.",
  },
  {
    question: "Есть ли скидки на длительную аренду?",
    answer: "Да! При аренде от 3 дней — скидка 5%, от 7 дней — 10%, от 14 дней — 15%. Скидка применяется автоматически при расчёте стоимости.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Вопросы и ответы</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Часто задаваемые </span>
            <span className="gold-text">вопросы</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
