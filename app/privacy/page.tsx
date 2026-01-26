import { DentalHeader } from "@/components/dental-header";
import { DentalFooter } from "@/components/dental-footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <DentalHeader />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Политика конфиденциальности</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Общие положения</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>1.1. Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных физических лиц, использующих сервис Esthetic Dental Lab (далее — Оператор).</p>
                <p>1.2. Использование сервиса означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных.</p>
                <p>1.3. Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Собираемые данные</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>2.1. Оператор собирает и обрабатывает следующие персональные данные:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Фамилия, имя, отчество</li>
                  <li>Контактный телефон</li>
                  <li>Адрес электронной почты</li>
                  <li>Данные медицинской организации (для врачей)</li>
                  <li>Адрес доставки (при необходимости)</li>
                </ul>
                <p>2.2. Также автоматически собираются технические данные: IP-адрес, тип браузера, время посещения сайта, cookies.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Цели обработки данных</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>3.1. Персональные данные обрабатываются в следующих целях:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Оформление и исполнение договора на оказание услуг</li>
                  <li>Связь с клиентом по вопросам заказа</li>
                  <li>Отправка уведомлений о статусе заказа</li>
                  <li>Улучшение качества обслуживания</li>
                  <li>Рассылка информации о специальных предложениях (с согласия пользователя)</li>
                </ul>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Защита данных</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>4.1. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования.</p>
                <p>4.2. Доступ к персональным данным имеют только уполномоченные сотрудники Оператора.</p>
                <p>4.3. Передача данных третьим лицам осуществляется только в случаях, предусмотренных законодательством РФ.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Права пользователя</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>5.1. Пользователь имеет право:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Получить информацию об обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения своих данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия или бездействие Оператора в уполномоченный орган</li>
                </ul>
                <p>5.2. Для реализации своих прав пользователь может обратиться по адресу: info@estheticlab.ru</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookies</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>6.1. Сайт использует файлы cookies для обеспечения корректной работы сервиса и улучшения пользовательского опыта.</p>
                <p>6.2. Пользователь может отключить использование cookies в настройках браузера, однако это может повлиять на функциональность сайта.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Изменение политики</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>7.1. Оператор оставляет за собой право вносить изменения в настоящую Политику.</p>
                <p>7.2. Актуальная версия Политики всегда доступна на сайте.</p>
                <p>7.3. Дата последнего обновления: 1 января 2026 года.</p>
              </div>
            </section>

            <section className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Контакты</h2>
              <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
                <p>Esthetic Dental Lab</p>
                <p>Адрес: 634050, Томская область, г. Томск, ул. Ферганская, 15</p>
                <p>Email: privacy@estheticlab.ru</p>
                <p>Телефон: +7 (918) 123-45-67</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <DentalFooter />
    </main>
  );
}
