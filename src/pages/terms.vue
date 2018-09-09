<template>
<div class="page-home">
  <div class="header">
    <v-nav2 isHome="true" :notice="notice" @hide="notice = null"></v-nav2>
  </div>

  <doc-wrap :title="$t('title')">
    <h3>{{ $t('subtitle1') }}</h3>
    <p>{{ $t('p1') }}</p>
    <p>{{ $t('p2') }}</p>
    <p>{{ $t('p3') }}</p>
    <h3>{{ $t('subtitle2') }}</h3>
    <p>{{ $t('p3a') }}</p>
    <p>{{ $t('p4') }}</p>
    <p>{{ $t('p5') }}</p>
    <p>{{ $t('p6') }}</p>
    <p>{{ $t('p7') }}</p>
    <p>{{ $t('p8') }}</p>
    <h3>{{ $t('p10') }}</h3>
    <ul>
        <li>{{ $t('p11') }}</li>
        <li>{{ $t('p12') }}</li>
        <li>{{ $t('p13') }}</li>
        <li>{{ $t('p14') }}</li>
        <li>{{ $t('p15') }}</li>
        <li>{{ $t('p16') }}</li>
    </ul>
    <h3>{{ $t('subtitle4') }}</h3>
    <ul>
      <li>{{ $t('p17') }}</li>
      <li>{{ $t('p18') }}</li>
      <li>{{ $t('p19') }}</li>
      <li>{{ $t('p20') }}</li>
    </ul>
    <h3>{{ $t('subtitle5') }}</h3>
    <ul>
      <li>{{ $t('p21') }}</li>
    </ul>
    <h3>{{ $t('subtitle6') }}</h3>
    <ul>
        <li>{{ $t('p22') }}</li>
        <li>{{ $t('p23') }}</li>
        <li>{{ $t('p24') }}</li>
        <li>{{ $t('p25') }}</li>
        <li>{{ $t('p26') }}</li>
    </ul>
    <h3>{{ $t('subtitle7') }}</h3>
    <ul>
        <li>{{ $t('p27') }}</li>
        <li>{{ $t('p28') }}</li>
        <li>{{ $t('p29') }}</li>
    </ul>
    <h3>{{ $t('subtitle8') }}</h3>
    <ul>
        <li>{{ $t('p30') }}</li>
        <li>{{ $t('p31') }}</li>
        <li>{{ $t('p32') }}</li>
        <li>{{ $t('p33') }}</li>
        <li>{{ $t('p34') }}</li>
        <li>{{ $t('p35') }}</li>
        <li>{{ $t('p36') }}</li>
        <li>{{ $t('p37') }}</li>
        <li>{{ $t('p38') }}</li>
        <li>{{ $t('p39') }}</li>
        <li>{{ $t('p40') }}</li>
        <li>{{ $t('p41') }}</li>
        <li>{{ $t('p42') }}</li>
    </ul>
    <h3>{{ $t('subtitle9') }}</h3>
    <ul>
        <li>{{ $t('p43') }}</li>
        <li>{{ $t('p44') }}</li>
        <li>{{ $t('p45') }}</li>
        <li>{{ $t('p46') }}</li>
        <li>{{ $t('p47') }}</li>
        <li>{{ $t('p48') }}</li>
        <li>{{ $t('p49') }}</li>
        <li>{{ $t('p50') }}</li>
        <li>{{ $t('p51') }}</li>
    </ul>
    <h3>{{ $t('subtitle10') }}</h3>
    <ul>
        <li>{{ $t('p52') }}</li>
        <li>{{ $t('p53') }}</li>
    </ul>
    <h3>{{ $t('subtitle11') }}</h3>
    <ul>
        <li>{{ $t('p54') }}</li>
        <li>
            <ul>
                <li>{{ $t('p55') }}</li>
                <li>{{ $t('p56') }}</li>
                <li>{{ $t('p57') }}</li>
                <li>{{ $t('p58') }}</li>
                <li>{{ $t('p59') }}</li>
                <li>{{ $t('p60') }}</li>
                <li>{{ $t('p61') }}</li>
                <li>{{ $t('p62') }}</li>

            </ul>
        </li>
        <li>{{ $t('p63') }}</li>
        <li>
            <ul>
                <li>{{ $t('p64') }}</li>
                <li>{{ $t('p65') }}</li>
                <li>{{ $t('p66') }}</li>
                <li>{{ $t('p67') }}</li>
                <li>{{ $t('p68') }}</li>

            </ul>
        </li>
        <li>{{ $t('p69') }}</li>
        <li>{{ $t('p70') }}</li>
        <li>{{ $t('p71') }}</li>
        <li>{{ $t('p72') }}</li>
        <li>{{ $t('p73') }}</li>
        <li>{{ $t('p74') }}</li>
        <li>{{ $t('p75') }}</li>
        <li>{{ $t('p76') }}</li>
        <li>{{ $t('p77') }}</li>
        <li>{{ $t('p78') }}</li>
    </ul>
    <h3>{{ $t('subtitle12') }}</h3>
    <ul>
      <li>{{ $t('p79') }}</li>
      <li>{{ $t('p80') }}</li>
      <li>{{ $t('p81') }}</li>
      <li>{{ $t('p82') }}</li>
    </ul>
    <h3>{{ $t('subtitle13') }}</h3>
    <ul>
        <li>{{ $t('p83') }}</li>
        <li>{{ $t('p84') }}</li>
        <li>{{ $t('p85') }}</li>
        <li>{{ $t('p86') }}</li>
    </ul>
    <h3>{{ $t('subtitle14') }}</h3>
    <ul>
        <li>{{ $t('p87') }}</li>
    </ul>
    <h3>{{ $t('subtitle15') }}</h3>
    <ul>
      <li>{{ $t('p88') }}</li>
    </ul>
    <h3>{{ $t('subtitle16') }}</h3>
    <ul>
      <li>{{ $t('p89') }}</li>
    </ul>
    <h3>{{ $t('subtitle17') }}</h3>
    <ul>
      <li>{{ $t('p90') }}</li>
    </ul>
    <h3>{{ $t('subtitle18') }}</h3>
    <ul>
      <li>{{ $t('p91') }}</li>
    </ul>
    <h3>{{ $t('subtitle19') }}</h3>
    <ul>
      <li>{{ $t('p92') }}</li>
    </ul>
    <h3>{{ $t('subtitle20') }}</h3>
    <ul>
      <li>{{ $t('p93') }}</li>
      <li>{{ $t('p94') }}</li>
    </ul>
    <h3>{{ $t('subtitle21') }}</h3>
    <ul>
      <li>{{ $t('p95') }}</li>
      <li>{{ $t('p96') }}</li>
    </ul>



  </doc-wrap>
</div>
</template>

<script>
import VNav2 from '@/components/VNav2'
import DocWrap from '@/components/docwrap'
export default {
  name: 'privacy-Policy',
  components: {
    VNav2,
    DocWrap
  },
  i18n: {
    messages: {
      en: {
        title: 'Privacy Policy',
        subtitle1: '1. Parties',
        p11: '1.1 MG Inc. (hereinafter referred to as "MG") is a company incorporated in British Virgin Island (BVI) under the laws of British Virgin Island (BVI), and operates the Website https://www.thinkbit.com (hereinafter referred to as \'this Website\' or \'the Website\'), which is a platform dedicated to the transaction of digital assets and the provision of related services (hereinafter referred to as \'the Service\'). For the convenience of wording in this Agreement, the Company and the Website are referred to collectively as \'we\' or other applicable forms of first person pronouns in this Agreement.',
        p12: '1.2 All natural persons or other subjects who log onto this Website shall be users of this Website. For the convenience of wording in this Agreement, the users are referred to as \'you\' or any other applicable forms of the second-person pronouns.',
        p13: '1.3 For the convenience of wording in this Agreement, you and we are collectively referred to as “both parties”, and individually as “one party”.',
        subtitle2: '2. Purposes of the Privacy Policy',
        p2: 'The Privacy Policy stipulates the types of information of yours that we may collect through your log into this Website, your registration with this Website, and/or use the services we offer, as well as how we shall use and protect the information so collected.',
        subtitle3: '3 Your consent',
        p3: 'To ensure that you have full confidence in our handling of personal data, you are advised to read and understand the terms of this Privacy Policy in detail. In particular, upon your log into our Website, regardless of whether you register with this Website, you shall be deemed to accept, agree, undertake and confirm that:',
        p30: 'User commitment：upon you click "confirmation", regardless of full civil capacity or limited civil capacity, you shall be deemed to register and accept ThinkBit pro service with the consent from the legally authorized representative.',
        p31: '3.1 You, on the basis of your own free will and your requisite consent, agree to disclose your personal information to us;',
        p32: '3.2 You will comply with all the terms and limitations of this Privacy Policy;',
        p33: '3.3 You agree that we may collect your information through your log into this Website, your registration with this Website, and/or your using the Services offered by us; you agree to any changes and modifications that we may make to our Privacy Policy in the future;',
        p34: '3.4 You agree that our branches, affiliates and employees may contact you in connection with the products and services that you may be interested in (unless you have indicated that you do not want to receive such information).',
        subtitle4: '4. Information Collected',
        p41: '4.1 When you use this Website, you agree to permit us to use cookies to track each of your actions and collect and keep all the information that you leave on this Website, including but not limited to your IP address, location, and other information.',
        p42: '4.2 If you are willing to use the services offered by this Website, you will be required to fill in and provide the following two categories of information:',
        p421: '4.2.1 Identity Information.Such information can help us verify whether you are eligible to be registered as a member of this Website. It includes but is not limited to your name, residence address, mailing address, other certificates and corresponding numbers thereof that are issued by your country or government to certify your identity information, as well as all other information that can help us to verify your identity (hereinafter referred to as \'identity information\').',
        p422: '4.2.2 Service information. Such information helps us to contact you and provide you with the services, including but not limited to your phone number, fax number, valid email address, mailing address, and information concerning your debit card and/or other accounts (hereinafter collectively referred to as \'service information\').',
        p43: '4.3 When you use this Website or the services this Website offers, we may collect more information necessary from our exclusive mailboxes or in other manners that we consider as in compliance with relevant requirements, for the purpose of improving the functions of this Website, enhancing your experience of using this Website and its services as well as the security thereof, or as is required by any court order, any applicable law, administrative regulation or any order of any other competent government agency.',
        p44: '4.4 If you visit any of links to third-party websites as are listed on this Website or any link of any of our third-party partners, you shall agree to and comply with the separate and independent Privacy Policy of such third party website. We will not bear any liability for the contents and activities of such websites or the partners.',
        subtitle5: '5. Cookies',
        p51: '5.1 When you visit our Website, we use Google stats via cookies to record our performance and check the effect of online advertising. Cookies are a small amount of data that is sent to your browser and stored on your computer hard drive. Only when you use your computer to access our Website can the cookies be sent to your computer hard drive.',
        p52: '5.2 Cookies are usually used to record the habits and preferences of visitors in browsing the items on our Website. The information collected by cookies is non-registered and collective statistical data and does not involve personal data.',
        p53: '5.3 Cookies, which enable the Website or service provider system to recognize your browser and capture and recall information, cannot be used to obtain data on your hard drive, your email address, or your personal data. Most browsers are designed to accept cookies. You can opt to set your browser to reject cookies, or to notify you as soon as possible if you are loaded on cookies. However, if you set your browser to disable cookies, it is possible that you may not be able to launch or use some functions of our Website.',
        subtitle6: '6. Purposes of Information',
        p61: '6.1 We will use your information that we collect for the following purposes or in the following ways:',
        p611: '6.1.1 to provide you with our Services through our Website;',
        p612: '6.1.2 to identify and confirm your identity when you use our Website;',
        p613: '6.1.3 to improve and upgrade the services of the Website (your information and feedback received by us can help us improve the service of the Website, so that we can more effectively respond to your service requests and support needs);',
        p614: '6.1.4 to keep statistics relating to the use of our Website and to be used for data analysis carried out in cooperation with government agencies, public affairs institutions;',
        p615: '6.1.5 to personalize your experience (your information will help us to better respond to your personalized needs);',
        p616: '6.1.6 to facilitate transactions (your information, whether public or private, will not be sold, exchanged, transferred, or otherwise provided to any other company on any grounds without your consent, except for where doing so is expressly for the purpose of completing the transaction you require);',
        p617: '6.1.7 to send e-mail regularly (the email address that you provide for the purpose of processing orders may be used to receive information on and updates to your orders, in addition to newsletters, updates, related products or services information, etc., that we may send to you from time to time)',
        p618: '6.1.8 to meet other purposes as specified in the User Agreement of this Website and all legal means adopted for satisfying such purposes.',
        p62: '6.2 We do not sell, trade, or otherwise transfer information or allow others to collect, use information; however, such information does not involve the following parties and does not include the following information: our affiliates, trusted third parties who help us operate our websites, manage our business, or provide services to you, provided that such parties agree to keep such information confidential; When we believe that information disclosure is appropriate, or it is required by any of the applicable laws, regulations, rules or by any order of courts or other competent authorities, and is necessary for executing the strategy of our Website and ensuring the proper functioning of the Website, or as may be necessary for the related parties to provide services, or for the protection of the rights, property or safety of us or other persons. However, your information will not be provided to other parties for marketing, advertising or other purposes.',
        subtitle7: '7. Protection of Personal Data',
        p71: '7.1 We adopt appropriate physical, electronic, management and technical measures so as to protect and safeguard the security of your personal data. We will, to the greatest extent possible, ensure that any personal data collected through our Website shall be free from being subject to nuisance by any third party unrelated to us. The security measures that we may take include but are not limited to:',
        p711: '7.1.1 Physical measures: records of your personal data will be stored in a properly locked place.',
        p712: '7.1.2 Electronic measures: The computer data that contain your personal information will be stored in computer systems and storage medias that are subject to strict login restrictions.',
        p713: '7.1.3 Management measures: only staff members duly authorized by us can access your personal data, and these staff members shall comply with our internal code concerning personal data confidentiality.',
        p714: '7.1.4 Technical measures: such encryption techniques as Secure Socket Layer Encryption may be used to convey your personal data.',
        p715: '7.1.5 Other measures: our network servers are protected by proper \'firewall\'.',
        p72: '7.2 If you are aware of any security flaws in our Website, please contact us immediately so that we can take appropriate action as soon as possible.',
        p73: '7.3 Despite of the above-mentioned technical and security measures, we cannot guarantee that the information transmitted via the Internet is absolutely safe, so we cannot absolutely guarantee that the personal data that you provide to us through our Website will be safe at any time. We will not be held liable for any loss or damage arising from or caused by any event that may occur in connection with unauthorized access to your personal data, and we shall not be held liable for compensation for such loss or damage.',
        subtitle8: '8 Modification to the Privacy Policy',
        p8: 'We reserve the right to amend the Privacy Policy from time to time and at any time. We will inform you of the modifications made to the Privacy Policy by updating and publishing the effective date of the release of new versions hereof and highlighting the amendments. Sometimes, we may issue a notice to inform you of the modification made in the Privacy Policy, which, however, is not an obligation for us. You shall regularly review the Privacy Policy and focus on its modifications, and if you do not agree to such modifications, you shall immediately stop accessing this Website. When an updated version of this Privacy Policy is released, your continued visit to this Website shall indicate and show that you agree to the update and agree to comply with the updated Privacy Policy.',
        subtitle9: '9 Communication with Us',
        p91: '9.1 If you have any requests and comments, you can send an email to support@thinkbit.com, which is the only valid and official email through which we communicate with you, so we will not bear any liability for your failure to using effective contact information, any act or omission.',
        p92: '9.2 We only publish announcements and information on the basis of the valid and effective contact information on this Website or post announcements on this Website; therefore, we shall not be held liable for any loss arising from your trust in the information that has not been obtained through the above-mentioned means.',
        p93: '9.3 If you have any questions regarding our Privacy Policy, you are welcome to contact us at any time.'
      },
      'zh-CN': {
        title: '用户使用条款',
        subtitle1: '最近更新日期：2018年9月12日',
        p1: '请您在注册成为本网站用户前务必仔细阅读本用户使用条款（以下称“本协议”），若您不同意或无法理解本协议的任意内容，请勿访问本网站或使用本网站服务。若您注册成为本网站用户，则表示：（1）您已经签订本协议；（2）您对本协议的全部内容已充分阅读并认可和同意遵守；（3）您承诺遵守任何可适用的法律、法规、规章及其他政府规范性文件的规定，如有违反而造成任何法律后果，您将以独立承担所有相应的法律责任。',
        p2: '本协议适用由服务提供商DVPP LTD（以下称“公司”）提供的所有服务，包括但不限于通过公司运营网站www.ix.com（以下称“网站”）及后续由公司发布的移动应用程序向您提供的数字资产交易和相关服务（以下称“服务”）。',
        p3: '本协议由公司与用户共同签订，为了本协议表述之方便，公司和网站在本协议中合称为“我们”。于本网站进行用户注册的适格自然人或其他主体均为本网站的用户，统称为“您”。我们和您在本协议中合称为“双方”，我们或您单称为“一方”。',
        subtitle2: '风险揭示及提醒：',
        p3a: '数字资产交易有极高风险，并不适合绝大部分人士。您了解和理解此投资有可能导致部分损失或全部损失，所以您应该以能承受的损失程度来决定投资的金额。您了解和理解数字资产会产生衍生风险，所以如有任何疑问，建议先寻求理财顾问或其他专业人士的协助。此外，除了下述提及过的风险以外，还会有未能预测的风险存在。您应慎重考虑并用清晰的判断能力去评估自己的财政状况及上述各项风险而作出任何买卖数字资产的决定，并承担由此产生的全部损失，我们对此不承担任何责任。',
        p4: '1.	信息准确风险：除IX以外，本网站所载的数字资产均不由本公司或本网站发行，本公司或本网站不对本网站所载的数字资产的及或其信息的真实、准确、合法性负责。',
        p5: '2.	市场风险：数字资产市场是一个新兴且未经确认的市场，而且数字资产随时可能失去价值，数字市场也可能消失。',
        p6: '3.	交易风险：数字货币因全天不间断交易，没有涨跌限制，价格容易受全球政府政策等诸多因素的影响而大幅波动，在完成交易过程中也存在操作错误可能无法追回情况。',
        p7: '4.	政策法律风险：因各国对数字资产的法律地位未确定，意味持有数字资产的合法性不明确。且数字资产是否被认定为资产也因不同国家法规而不一致。且可能因各国法律、法规和规范性文件的制定或者修改，数字资产交易随时可能被暂停或被禁止。',
        p8: '5.	软件系统风险：使用互联网形式的交易系统存有风险，包括但不限于软件、硬件和互联网链结的失败等或被黑客攻击的可能。由于我们不能控制互联网的可靠性和可用性，也无法控制黑客攻击行为。',
        p9: '4.	我们如何保护您的个人信息',
        p10: '1	总则',
        p11: '1.1	本协议由正文、本网站已经发布的隐私条款及本网站已经发布的或将来可能发布的各类规则、声明、说明等构成。',
        p12: '1.2	您成为本网站的用户前，请务必仔细阅读本协议，若您不同意或无法理解本协议的任意内容，请勿访问本网站或使用本网站服务。',
        p13: '1.3	您成为本网站的用户后，您将获得一个帐号及相应的密码，该帐号和密码由您负责保管；您应当对以其您帐号进行的所有活动和事件负法律责任。我们也将严格采取相应技术措施保护用户的账号及个人信息安全，包括但不限于对用户密码相关信息采用专业加密的存储与传输方式。同时，我们将运用相关安全技术确保我们掌握的信息不丢失、不被滥用和变造。但请注意，尽管公司将竭尽全力保护您的账号及信息安全，但在互联网情况下不存在绝对安全的保障措施。',
        p14: '1.4	本网站仅作为您获取数字资产信息、寻找交易方、就数字资产的交易进行协商及开展交易的场所，本网站不参与您的任何交易。故您应自行谨慎判断确定相关数字资产及/或信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。本网站的任何意见、消息、探讨、分析、价格、建议和其他资讯均是一般的市场评论，并不构成投资建议。我们不承担任何因依赖该资讯直接或间接而产生的损失。',
        p15: '1.5	本网站的内容会随时更改并不作另行通知，您应当及时关注本网站的更新。我们已采取合理措施确保网站资讯的准确性，但并不能保证其准确性程度，亦不会承担任何因本网站上的资讯或因未能链结互联网、传送或接收任何通知和信息时的延误或失败而直接或间接产生的损失。',
        p16: '1.6	禁止使用本网站从事洗钱、走私、商业贿赂等一切非法交易活动，若发现此类事件，本站将采取各种可使用之手段，包括但不限于冻结账户，通知相关权力机关等，我们不承担由此产生的所有责任并保留向相关人士追究责任的权利。',
        subtitle4: '2	适用范围',
        p17: '2.1	本服务仅适用于18岁或以上的用户或其他适格主体。',
        p18: '2.2	如您属于自然人，请您确认您已年满18周岁或根据不同的可适用的法律规定的具有可订立合同的法定年龄，并有充分的能力接受这些条款，并使用本网站进行数字资产交易。',
        p19: '2.3	如您如果您代表任何实体使用本服务，您声明并保证（1）该实体是符合注册地法律法规的合法机构；（2）您有权代表该实体接受本协议。如果您违反本协议，该实体同意对您的行为负责。',
        p20: '2.4	IX保留其选择服务市场和司法管辖区的权利，并可能限制或拒绝对某些特定国家提供服务。本协议的内容不得排除在用户所在国的法律之外。IX会禁止黑名单用户使用与IX相关的任何服务。如果您不符合这些要求，请勿使用我们的服务，我们也将保留立即停止您使用IX所有服务的权利。',
        subtitle5: '3	协议修订',
        p21: '3.1	公司保留不时修订本协议条款的权利，包括但不限于本协议具体条款及本网站的任何政策、准则等其他相关内容。在修订本协议后，我们会将修订后的条款通过以网站公示的方式进行公告，无特殊情况，公司不再单独通过电子邮件方式发送至您注册的邮件。变更后的协议会在本协议首页标注“最后修订”的日期，一经在网站公布，立即生效。您应不时浏览及关注本协议的更新变更日期及更新内容，如您不同意相关变更，应当立即停止使用本网站服务；您继续使用本网站服务，即表示您接受并同意经修订的协议的约束。如在使用本网站中存在任何问题，请及时联系【】。',
        subtitle6: '4	注册流程',
        p22: '4.1	为使用我们的服务，您同意根据本网站用户注册页面的要求提供有效的注册信息，包括但不限于您的姓名、电子邮箱、手机号码等信息在您进行注册时，您必须同意并接受本协议。',
        p23: '4.2	您确保您已经合法、真实、完整并有效提供注册所需信息并经验证，在您完成注册之后，您有权获得本网站账号和密码，您获得本网站账号及密码时视为注册成功，可在本网站进行会员登陆。并对以此账号和密码登入系统后所发生的所有活动和事件负责，自行承担一切使用该账号的言语、行为等而直接或者间接导致的法律责任。',
        p24: '4.3	您有责任保留，保护和保障任何已经获得的账号、密码。如遗失的，您可以通过注册电子邮箱或手机号码获取验证码，验证成功后，获取新密码。用户若发现任何非法使用用户名或存在其他安全漏洞的情况，应立即告知本网站。',
        p25: '4.4	本网站有权在合理时间内对您的该等请求采取行动，但本网站对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。您在未经本网站同意的情况下不得将本网站账号以赠与、借用、租用、转让或其他方式处分给他人。',
        p26: '4.5	如按照不同国家、地区相关法律法规的规定，您必须根据我们的要求及时提供您的真实姓名、身份证件等法律法规，包括反洗钱规定的相关信息。您应对该等信息的真实性、完整性和准确性负责，并承担因提供虚假或不完整信息产生的任何直接或间接损失及不利后果。',
        subtitle7: '5	我们的服务',
        p27: '5.1	本网站只为您通过本网站进行数字资产交易活动提供服务，包括但不限于提供【法币交易、币币交易、合约或其他衍生品、数字资产资讯】等网络交易平台服务。本网站保持对已提供的服务进行调整的权利。本网站不接受也不提供任何国家法定货币充入和提取的相关服务。',
        p28: '5.2	IX的部分服务是以收费方式提供的，如用户使用收费服务，请遵守相关的协议。IX可能根据实际需要对收费服务的收费标准、方式进行修改和变更，IX也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，IX将在相应服务页面进行通知或公告。如果用户不同意上述修改、变更或付费内容，则应停止使用该服务。',
        p29: '5.3	其他本网站为您提供的服务。',
        subtitle8: '6	您的权利和义务',
        p30: '6.1	您有权在本网站浏览数字资产资讯，包括各项产品的实时行情及交易信息，并通过本网站提交数字资产交易指令并完成数字资产交易。',
        p31: '6.2	您有权在本网站查看您注册账号下的信息，有权通过本网站提供的功能进行操作。',
        p32: '6.3	您有权按照本网站发布的活动规则参与本网站组织的网站活动。',
        p33: '6.4	您保证交易中涉及到的属于您的数字资产均为合法取得并所有。',
        p34: '6.5	您同意您为您自身的交易或非交易行为承担全部责任和任何收益或亏损。',
        p35: '6.6	您确认注册时提供的信息是真实和准确的。',
        p36: '6.7	您同意遵守任何有关法律的规定，就税务目的而言，包括报告任何交易利润。',
        p37: '6.8	您应当遵守法律法规、规章、及政策要求的规定，不得在本网站或利用本网站服务从事非法或其他损害本网站或第三方权益的活动。',
        p38: '6.9	您同意您对您的本网站的账号、密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。',
        p39: '6.10	您在本网站进行数字资产交易时不得恶意干扰数字资产交易的正常进行、破坏交易秩序；不得以任何技术手段或其他方式干扰本网站的正常运行或干扰其他用户对本网站服务的使用；不得以虚构事实等方式恶意诋毁本网站的商誉。',
        p40: '6.11	如您因网上交易与其他用户产生纠纷的，不得通过司法或行政以外的途径要求本网站提供相关资料。',
        p41: '6.12	您在使用本网站提供的服务过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由您独自承担。',
        p42: '6.13	您应当遵守本网站不时发布和更新的本协议以及其他服务条款和操作规则，有权随时终止使用本网站提供的服务。',
        subtitle9: '7	我们的权利和义务',
        p43: '7.1	如您不具备本协议约定的注册资格，则本网站有权拒绝您进行注册，对已注册的，本网站有权注销您的账号，本网站保留向您或您的有权代理人追究责任的权利。同时，本网站保留其他任何情况下决定是否接受您注册的权利。',
        p44: '7.2	本网站发现账户使用者并非账户初始注册人时，有权中止或终止该账户的使用。',
        p45: '7.3	本网站通过技术检测、人工抽检等检测方式合理怀疑您提供的信息错误、不实、失效或不完整时，有权通知您更正、更新信息或中止、终止为其提供本网站服务。',
        p46: '7.4	本网站有权在发现本网站上显示的任何信息存在明显错误时，对信息予以更正。',
        p47: '7.5	本网站保留随时修改、中止或终止本网站服务的权利，本网站行使修改或中止服务的权利不需事先告知您；本网站终止本网站一项或多项服务的，终止自本网站在网站上发布终止公告之日生效。',
        p48: '7.6	本网站应当采取必要的技术手段和管理措施保障本网站的正常运行，并提供必要、可靠的交易环境和交易服务，维护数字资产交易秩序。',
        p49: '7.7	本网站通过加强技术投入、提升安全防范等措施保障您的数字资产的安全，有义务在您账户出现可以预见的安全风险时提前通知您。',
        p50: '7.8	本网站有权随时删除本网站内各类不符合法律法规或本网站规定等的内容信息，本网站行使该等权利不需提前通知您。',
        p51: '7.9	本网站有权根据您所属主权国家或地区的法律法规、规则、命令等规范的要求，向您要求提供更多的信息或资料等，并采取合理的措施以符合当地的规范之要求，您有义务配合上述措施；本网站有权根据您所属主权国家或地区的法律法规、规则、命令等规范的要求，暂停或永久停止对您的开放本网站及其部分或全部服务。',
        subtitle10: '8	赔偿',
        p52: '8.1	因您违反本协议或经在此提及而纳入本协议的其他文件，或因您违反了法律、法规、规章、政府规范性文件或侵害了第三方的权利，而使本公司及其股东、职员、代理人在第三方对本网站及其股东、职员、代理人提起的诉讼中遭受的任何损失（包括但不限于由此产生的司法费用和聘请其他专业人士的费用），您必须对本公司及股东、职员、代理人承担赔偿责任，使其等免遭损失。',
        p53: '8.2	如因本网站违反有关法律、法规或本协议项下的任何条款而给用户造成损失，本网站同意承担由此造成的损害赔偿责任。',
        subtitle11: '9	责任限制与免责',
        p54: '9.1	您了解并同意，在任何情况下，我们不就以下各事项承担责任：',
        p55: '9.1.1	收入的损失；',
        p56: '9.1.2	交易利润或合同损失；',
        p57: '9.1.3	业务中断；',
        p58: '9.1.4	预期可节省的货币的损失；',
        p59: '9.1.5	信息的损失；',
        p60: '9.1.6	机会、商誉或声誉的损失；',
        p61: '9.1.7	购买替代产品或服务的成本；',
        p62: '9.1.8	任何由于侵权（包括过失）、违约或其他任何原因产生的间接的、特殊的或附带性的损失或损害，不论这种损失或损害是否可以为我们合理预见；不论我们是否事先被告知存在此种损失或损害的可能性。',
        p63: '9.2	您了解并同意，我们不对因下述任一情况而导致您的任何损害赔偿承担责任：',
        p64: '9.2.1	我们有合理的理由认为您的具体交易事项可能存在重大违法或违约情形时对您采取本协议下相关措施。',
        p65: '9.2.2	我们有合理的理由认为您在本网站的行为涉嫌违法或不当时对您采取本协议下相关措施。',
        p66: '9.2.3	您通过本网站服务购买或获取任何数据、信息或进行交易等行为或替代行为产生的费用及损失。',
        p67: '9.2.4	您对本网站服务的误解。',
        p68: '9.2.5	任何非因我们的原因而引起的与本网站提供的服务有关的其它损失。',
        p69: '9.3	我们对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、银行或其他合作方原因、数字资产市场崩溃、政府行为、司法或行政机关的命令、其他不在我们可控范围内或我们无能力控制的行为或第三方的原因而造成的不能服务或延迟服务，以及造成的您的损失，我们不承担任何责任。',
        p70: '9.4	我们不能保证本网站包含的全部信息、程序、文本等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏，故您登陆、使用本网站任何服务或下载及使用该下载的任何程序、信息、数据等均是您个人的决定并自行承担风险及可能产生的损失。',
        p71: '9.5	我们对本网站中链接的任何第三方网站的任何信息、产品及业务及其他任何形式的不属于我们的主体的内容等不做任何保证和承诺，您如果使用第三方网站提供的任何服务、信息及产品等均为您个人决定且承担由此产生的一切责任。',
        p72: '9.6	我们对于您使用本网站服务不做任何明示或暗示的保证，包括但不限于本网站提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，我们也不对本网站提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性作出任何承诺和保证。是否登陆或使用本网站提供的服务是您个人的决定且自行承担风险及可能产生的损失。我们对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，您理解并了解数字资产市场是不稳定的，价格和价值随时会大幅波动或崩盘，交易数字资产是您个人的自由选择及决定且自行承担风险及可能产生的损失。',
        p73: '9.7	本协议中规定的我们的保证和承诺是由我们就本协议和本网站提供的服务的唯一保证和陈述，并取代任何其他途径和方式产生的保证和承诺，无论是书面的或口头的，明示的或暗示的。所有这些保证和陈述仅仅代表我们自身的承诺和保证，并不保证任何第三方遵守本协议中的保证和承诺。',
        p74: '9.8	我们并不放弃本协议中未提及的在法律适用的最大范围内我们享有的限制、免除或抵销我们损害赔偿责任的任何权利。',
        p75: '9.9	您注册后即表示认可我们按照本协议中规定的规则进行的任何操作，产生的任何风险均由您承担。',
        p76: '9.10	由于系统故障，网络原因，DDos等黑客攻击等意外因素可能导致的异常成交，行情中断，以及其他可能的异常情况，IX有权根据实际情况取消异常成交结果，以及回滚某一段时间的所有成交。',
        p77: '9.11	IX网不会向任何用户索取密码，不会让用户往任何非本站交易中心里提供的帐户、BTC/LTC充值地址打款，请大家不要相信任何IX网打折、优惠等信息，往非BTC/LTC交易中心提供的账户、地址里打款或币所造成的损失本站不负责任。',
        p78: '9.12	用户同意，基于运行和交易安全的需要，本网站可以暂时停止提供或者限制本服务部分功能, 或提供新的功能，在任何功能减少、增加或者变化时，只要用户仍然使用本服务，表示用户仍然同意本协议或者变更后的协议。',
        subtitle12: '10	协议的终止',
        p79: '10.1	本网站有权依据本协议约定注销您的本网站账号，本协议于账号注销之日终止。',
        p80: '10.2	本网站有权依据本协议约定终止全部本网站服务，本协议于本网站全部服务终止之日终止。',
        p81: '10.3	本协议终止后，您无权要求本网站继续向您提供任何服务或履行任何其他义务。',
        p82: '10.4	本协议的终止不影响守约方向违约方要求其他责任的承担。',
        subtitle13: '11	知识产权',
        p83: '11.1	本网站所包含的全部智力成果包括但不限于网站标志、数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件(包括小应用程序和脚本) 的知识产权权利均归本网站所有。您不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。',
        p84: '11.2	本网站名称中包含的所有权利 (包括但不限于商誉和商标、标志)均归公司所有。',
        p85: '11.3	您在使用本网站服务过程中不得非法使用或处分本网站或他人的知识产权权利。',
        p86: '11.4	您登陆本网站或使用本网站提供的任何服务均不视为我们向您转让任何知识产权。',
        subtitle14: '12	信息保护',
        p87: '12.1	我们将在本网站公布隐私条款并根据合理情况对其进行修订，隐私条款构成本协议的有效组成部分。',
        subtitle15: '13	转让',
        p88: '13.1	您不得在未取得我们书面同意的前提下转让给任何第三人，但我们可在给予您提前30天的通知的前提下，将我们在本协议中的权利和义务转让给任何第三人。',
        subtitle16: '14	可分割性',
        p89: '14.1	如本协议中的任何条款被任何有管辖权的法院认定为不可执行、无效或非法时，并不影响本协议的其余条款的效力。',
        subtitle17: '15	非代理关系',
        p90: '15.1	本协议中的任何规定均不可被认为创造了、暗示了或以其他方式将我们视为您的代理人、受托人或其他代表人，本协议有其他规定的除外。',
        subtitle18: '16	弃权',
        p91: '16.1	任何一方对追究本协议约定的违约责任或其他责任的弃权并不能认定或解释为对其他违约责任的弃权；任何情况下，未行使任何权利或救济不得被解释为对该等权利或救济的放弃。',
        subtitle19: '17	标题',
        p92: '17.1	所有标题仅供协议表述方便，并不用于扩大或限制该协议条款的内容或范围。',
        subtitle20: '18	适用法律',
        p93: '18.1	本协议的订立、变更、执行和解释，以及与本协议有关的争议解决，均应适用新加坡法律。如与本协议有关的某一特定事项没有法律规定或规定不明确，则应参照通用的国际商业惯例和行业惯例。',
        p94: '18.2	如因本协议或本网站服务所引起或与其有关的任何争议应提交新加坡国际仲裁中心（下称“新仲”），依据仲裁开始时最新施行的《新加坡国际仲裁中心仲裁规则》（下称“新仲规则”），以新加坡为仲裁地，通过仲裁方式最终解决。新仲规则视为本仲裁条款的一部分。',
        subtitle21: '19	协议的生效和解释',
        p95: '19.1	本协议于您点击本网站注册页面的同意注册并完成注册程序、获得本网站账号和密码时生效，对本网站和您均具有约束力。',
        p96: '19.2	本协议的最终解释权归本网站所有。',
      }
    }
  }
}
</script>
<style scoped lang="scss">
    @import "../styles/vars";
    @import "../styles/mixins";
    .page-home{background:#303E4B;}
    
</style>