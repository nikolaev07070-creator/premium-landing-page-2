import { DentalHeader } from "@/components/dental-header";
import { DentalFooter } from "@/components/dental-footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <DentalHeader />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Условия работы</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Общие положения</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>1.1. Настоящие условия регулируют отношения между Esthetic Dental Lab (далее — Лаборатория) и заказчиком (врачом, клиникой) при оказании услуг по изготовлению зубных протезов и реставраций.</p>
                <p>1.2. Размещение заказа означает полное согласие заказчика с настоящими условиями.</p>
                <p>1.3. Лаборатория оставляет за собой право изменять условия работы с уведомлением клиентов не менее чем за 7 дней.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Порядок размещения заказа</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>2.1. Заказ принимается через официальные каналы связи: телефон, email, мессенджеры.</p>
                <p>2.2. При размещении заказа необходимо предоставить: оттиски/сканы, техническое задание, цветовую гамму, сроки выполнения.</p>
                <p>2.3. После согласования всех деталей заказ считается принятым в работу.</p>
                <p>2.4. Изменения в заказе после начала работы согласовываются дополнительно и могут повлиять на сроки и стоимость.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Сроки выполнения</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>3.1. Стандартные сроки выполнения:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Одиночные коронки: от 24 часов</li>
                  <li>Мостовидные протезы: 3-5 рабочих дней</li>
                  <li>Съемные протезы: 5-7 рабочих дней</li>
                  <li>Имплант-протезирование: 5-10 рабочих дней</li>
                  <li>Виниры: 5-7 рабочих дней</li>
                </ul>
                <p>3.2. Срочные заказы (менее 24 часов) выполняются по согласованию и с доплатой 30%.</p>
                <p>3.3. Сроки могут быть увеличены при сложных клинических случаях или необходимости дополнительных согласований.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Оплата</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>4.1. Оплата производится по факту выполнения заказа и проверки качества.</p>
                <p>4.2. Для постоянных клиентов возможна отсрочка платежа по индивидуальному согласованию.</p>
                <p>4.3. Приемлемые формы оплаты: наличные, банковский перевод, безналичный расчет.</p>
                <p>4.4. Стоимость рассчитывается индивидуально в зависимости от сложности работы и используемых материалов.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Гарантии и контроль качества</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>5.1. Лаборатория гарантирует соответствие выполненной работы техническому заданию и заявленным характеристикам.</p>
                <p>5.2. Гарантийный срок на изготовленные протезы составляет 12 месяцев при соблюдении условий эксплуатации.</p>
                <p>5.3. Все работы проходят многоуровневый контроль качества перед отправкой заказчику.</p>
                <p>5.4. При обнаружении производственного брака работа переделывается бесплатно в кратчайшие сроки.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Отмена и возврат</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>6.1. Отмена заказа возможна до начала производства без штрафных санкций.</p>
                <p>6.2. При отмене заказа после начала работы удерживается стоимость выполненных этапов.</p>
                <p>6.3. Возврат оплаты производится в течение 5 рабочих дней после согласования.</p>
                <p>6.4. Материалы, закупленные специально для заказа, оплачиваются отдельно при отмене.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Доставка</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>7.1. Доставка готовых работ осуществляется по согласованию с заказчиком.</p>
                <p>7.2. Доставка по городу Томск — бесплатно.</p>
                <p>7.3. Доставка в другие города осуществляется через курьерские службы за счет заказчика.</p>
                <p>7.4. Самовывоз возможен в рабочее время по предварительной договоренности.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Контакты</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>Esthetic Dental Lab</p>
                <p>Адрес: 634050, Томская область, г. Томск, ул. Ферганская, 15</p>
                <p>Телефон: +7 (918) 123-45-67</p>
                <p>Email: info@estheticlab.ru</p>
                <p>Режим работы: ежедневно 08:00 – 22:00, техподдержка 24/7</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <DentalFooter />
    </main>
  );
}
