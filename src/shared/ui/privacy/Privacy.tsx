'use client';

import { ContentSection } from '@/shared/ui/content-section/ContentSection';
import { useTranslations } from 'next-intl';

export const Privacy = () => {
  const t = useTranslations('Terms');
  const contentEn = (
    <>
      At Pictorial Site (&#34;we,&#34; &#34;us,&#34; or &#34;our&#34;), we are committed to protecting your privacy.
      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
      website Pictorial Site (the &#34;Site&#34;). Please read this Privacy Policy carefully. If you do not agree with
      with the terms of this Privacy Policy, please do not access the Site. <br />
      1. Information We Collect We may collect information about you in a variety of ways, including: Personal
      Information: Personally identifiable information, such as your name, email address, and phone number, which you
      voluntarily give when you register on the Site or when you choose to participate in various activities related to
      the Site. Usage Data: Information about your activity on the Site, including your IP address, browser type, access
      times, and pages viewed. <br />
      2. How We Use Your Information We may use the information we collect in the following ways: To provide, operate,
      and maintain our Site. To improve, personalize, and expand our Site. To understand and analyze how you use our
      Site. To communicate with you, either directly or through one of our partners, including for customer service, to
      provide you with updates and other information relating to the Site, and for marketing and promotional purposes.
      To process your transactions and send you confirmation. <br />
      3. Disclosure of Your Information We may share information we have collected about you in certain situations. Your
      information may be disclosed as follows: By Law or to Protect Rights: If we believe the release of information
      about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies,
      or to protect the rights, property, and safety of others, we may share your information as permitted or required
      by any applicable law, rule, or regulation. Third-Party Service Providers: We may share your information with
      third parties that perform services for us or on our behalf, including payment processing, data analysis, email
      delivery, hosting services, customer service, and marketing assistance. <br />
      4. Security of Your Information We use administrative, technical, and physical security measures to help protect
      your personal information. While we have taken reasonable steps to secure the personal information you provide to
      us, please be aware that no method of transmission over the Internet or method of electronic storage is 100%
      secure, and we cannot guarantee its absolute security. <br />
      5. Your Rights Depending on your location, you may have the following rights regarding your personal information:
      The right to access – You have the right to request copies of your personal information. The right to
      rectification – You have the right to request that we correct any information you believe is inaccurate. The right
      to erasure – You have the right to request that we erase your personal information, under certain conditions.
      <br />
      6. Changes to This Privacy Policy We may update our Privacy Policy from time to time. We will notify you of any
      changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically
      for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
    </>
  );
  const contentRu = (
    <>
      На сайте Pictorial (&#34;мы,&#34; &#34;нас,&#34; или &#34;наш&#34;) мы стремимся защищать вашу конфиденциальность.
      Эта Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию,
      когда вы посещаете наш веб-сайт Pictorial (&#34;Сайт&#34;). Пожалуйста, внимательно прочитайте эту Политику
      конфиденциальности. Если вы не согласны с условиями этой Политики конфиденциальности, пожалуйста, не заходите на
      Сайт. <br />
      1. Информация, которую мы собираем Мы можем собирать информацию о вас различными способами, включая: Личная
      информация: Лично идентифицируемая информация, такая как ваше имя, адрес электронной почты и номер телефона,
      которую вы добровольно предоставляете при регистрации на Сайте или при участии в различных мероприятиях, связанных
      с Сайтом. Данные об использовании: Информация о вашей активности на Сайте, включая ваш IP-адрес, тип браузера,
      время доступа и просмотренные страницы. <br />
      2. Как мы используем вашу информацию Мы можем использовать собранную информацию следующими способами: Для
      предоставления, эксплуатации и поддержки нашего Сайта. Для улучшения, персонализации и расширения нашего Сайта.
      Для понимания и анализа того, как вы используете наш Сайт. Для общения с вами, как напрямую, так и через одного из
      наших партнеров, включая обслуживание клиентов, предоставление вам обновлений и другой информации, связанной с
      Сайтом, а также для маркетинговых и рекламных целей. Для обработки ваших транзакций и отправки вам подтверждений.{' '}
      <br />
      3. Раскрытие вашей информации Мы можем делиться информацией, которую мы собрали о вас, в определенных ситуациях.
      Ваша информация может быть раскрыта следующим образом: По закону или для защиты прав: Если мы считаем, что
      раскрытие информации о вас необходимо для ответа на юридический процесс, расследования или устранения возможных
      нарушений наших политик, или для защиты прав, собственности и безопасности других лиц, мы можем раскрыть вашу
      информацию в соответствии с любым применимым законом, правилом или регламентом. Сторонние поставщики услуг: Мы
      можем делиться вашей информацией с третьими сторонами, которые выполняют услуги для нас или от нашего имени,
      включая обработку платежей, анализ данных, доставку электронной почты, хостинг услуг, обслуживание клиентов и
      маркетинговую помощь. <br />
      4. Безопасность вашей информации Мы используем административные, технические и физические меры безопасности для
      защиты вашей личной информации. Хотя мы предприняли разумные шаги для защиты предоставленной вами личной
      информации, пожалуйста, помните, что ни один метод передачи через Интернет или метод электронного хранения не
      является на 100% безопасным, и мы не можем гарантировать абсолютную безопасность. <br />
      5. Ваши права В зависимости от вашего местоположения, у вас могут быть следующие права в отношении вашей личной
      информации: Право на доступ – Вы имеете право запрашивать копии вашей личной информации. Право на исправление – Вы
      имеете право запрашивать, чтобы мы исправили любую информацию, которую вы считаете неточной. Право на удаление –
      Вы имеете право запрашивать, чтобы мы удалили вашу личную информацию при определенных условиях. <br />
      6. Изменения в этой Политике конфиденциальности Мы можем время от времени обновлять нашу Политику
      конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую Политику конфиденциальности на этой
      странице. Вам рекомендуется периодически просматривать эту Политику конфиденциальности на предмет изменений.
      Изменения в этой Политике конфиденциальности вступают в силу с момента их публикации на этой странице.
    </>
  );

  const content = t('PrivacyPolicyContentLanguage') === 'Ru' ? contentRu : contentEn;

  return <ContentSection title={t('PrivacyPolicy')} content={content} />;
};
