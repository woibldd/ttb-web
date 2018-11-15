<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
      />
    </div>

    <doc-wrap :title="$t('title')">
      <p>{{ $t('p1') }}</p>
      <h2>{{ $t('subtitle11') }}</h2>
      <p>{{ $t('p3') }}</p>
      <p>{{ $t('p4') }}</p>
      <p>{{ $t('p5') }}</p>
      <ul>
        <ol>{{ $t('p6') }}</ol>
        <ol>{{ $t('p7') }}</ol>
        <ol>{{ $t('p8') }}</ol>
        <ol>{{ $t('p9') }}</ol>
        <ol>{{ $t('p10') }}</ol>
        <ol>{{ $t('p11') }}</ol>
        <ol>{{ $t('p12') }}</ol>
        <ol>{{ $t('p13') }}</ol>
      </ul>
      <p>{{ $t('p14') }}</p>
      <h3>{{ $t('p15') }}</h3>
      <h2>{{ $t('subtitle1') }}</h2>
      <ul>
        <li>{{ $t('p19') }}</li>
        <li>{{ $t('p20') }}</li>
        <li>{{ $t('p21') }}</li>
        <li>{{ $t('p22') }}</li>
        <li>{{ $t('p23') }}</li>
        <li>{{ $t('p24') }}</li>
      </ul>

      <h2>{{ $t('subtitle2') }}</h2>
      <p>{{ $t('p28') }}</p>
      <p>{{ $t('p29') }}</p>
      <p>{{ $t('p30') }}</p>
      <p>{{ $t('p31') }}</p>
      <p>{{ $t('p32') }}</p>
      <h2>{{ $t('subtitle3') }}</h2>
      <p>{{ $t('p34') }}</p>
      <p>{{ $t('p35') }}</p>
      <p>{{ $t('p36') }}</p>
      <p>{{ $t('p37') }}</p>
      <ul>
        <li>{{ $t('p38') }}</li>
        <li>{{ $t('p39') }}</li>
        <li>{{ $t('p40') }}</li>
      </ul>
      <p>{{ $t('p41') }}</p>
      <p>{{ $t('p42') }}</p>
      <p>{{ $t('p43') }}</p>
      <p>{{ $t('p44') }}</p>
      <p>{{ $t('p45') }}</p>
      <p>{{ $t('p46') }}</p>
      <ul>
        <li>{{ $t('p47') }}</li>
        <li>{{ $t('p48') }}</li>
      </ul>
      <h2>{{ $t('subtitle4') }}</h2>
      <p>{{ $t('p50') }}</p>
      <p>{{ $t('p51') }}</p>
      <p>{{ $t('p52') }}</p>
      <p>{{ $t('p53') }}</p>
      <p>{{ $t('p54') }}</p>
      <h2>{{ $t('subtitle5') }}</h2>
      <p>{{ $t('p56') }}</p>
      <p>{{ $t('p57') }}</p>
      <p>{{ $t('p58') }}</p>
      <p>{{ $t('p59') }}</p>
      <p>{{ $t('p60') }}</p>
      <p>{{ $t('p61') }}</p>
      <p>{{ $t('p62') }}</p>
      <p>{{ $t('p63') }}</p>
      <p>{{ $t('p64') }}</p>
      <p>{{ $t('p65') }}</p>
      <p>{{ $t('p66') }}</p>
      <ul>
        <li>{{ $t('p67') }}</li>
        <li>{{ $t('p68') }}</li>
        <li>{{ $t('p69') }}</li>
        <li>{{ $t('p70') }}</li>
      </ul>
      <p>{{ $t('p71') }}</p>
      <p>{{ $t('p72') }}</p>
      <p>{{ $t('p73') }}</p>
      <p>{{ $t('p74') }}</p>
      <p>{{ $t('p75') }}</p>
      <p>{{ $t('p76') }}</p>
      <p>{{ $t('p77') }}</p>
      <p>{{ $t('p78') }}</p>
      <p>{{ $t('p79') }}</p>
      <ul>
        <li>{{ $t('p80') }}</li>
        <li>{{ $t('p81') }}</li>
        <li>{{ $t('p82') }}</li>
        <li>{{ $t('p83') }}</li>
        <li>{{ $t('p84') }}</li>
        <li>{{ $t('p85') }}</li>
      </ul>
      <h2>{{ $t('subtitle6') }}</h2>
      <p>{{ $t('p87') }}</p>
      <p>{{ $t('p88') }}</p>
      <h2>{{ $t('subtitle7') }}</h2>
      <p>{{ $t('p90') }}</p>
      <p>{{ $t('p91') }}</p>
      <p>{{ $t('p92') }}</p>
      <p>{{ $t('p93') }}</p>
      <ul>
        <li>{{ $t('p94') }}</li>
        <li>{{ $t('p95') }}</li>
        <li>{{ $t('p96') }}</li>
        <li>{{ $t('p104') }}</li>
        <li>{{ $t('p97') }}</li>
        <li>{{ $t('p98') }}</li>
      </ul>
      <p>{{ $t('p99') }}</p>
      <h2>{{ $t('subtitle8') }}</h2>
      <p>{{ $t('p101') }}</p>
      <p>{{ $t('p102') }}</p>
      <p>{{ $t('p103') }}</p>

    </doc-wrap>
  </div>
</template>

<script>
import VNav2 from '@/components/VNav3'
import DocWrap from '@/components/docwrap'
export default {
  name: 'PrivacyPolicy',
  components: {
    VNav2,
    DocWrap
  },
  i18n: {
    messages: {
      en: {
        title: 'Privacy Agreement Of IXX',
        p1: 'This clause only applies to DVPP. LTD (hereinafter referred to as "IXX"), a company registered in Singapore under the relevant laws of the Republic Of Singapore, which provides digital asset transaction and related services that include currency transaction, contract or other derivatives, digital asset information, etc.',
        subtitle11: 'Updated date: September 12, 2018',
        p3: 'If you have any questions, comments or suggestions, please contact us through the following contact information:',
        p4: 'Online customer service and email:[service@IXX.COM]',
        p5: 'This clause will help you understand the following:',
        p6: '1.	How we collect and use your personal information;',
        p7: '2.	How we use cookies and technologies which are similar to it;',
        p8: '3.	How we share, transfer, and publicly disclose your personal information',
        p9: '4.	How we protect your personal information',
        p10: '5.Your rights',
        p11: '6. How your personal information transfer globally',
        p12: '7. How this clause is updated',
        p13: '8. How to contact us',
        p14: 'IXX deeply understands the importance of personal information to you and will do its best to protect your personal information.We are committed to maintaining your trust in us and protecting your personal information and will use, collect and process your personal information in accordance with the principles of legality, integrity and necessity.At the same time, IXX promises that we will take safety precautions to protect your personal information in accordance with mature safety standards in this industry.In addition, we have taken measures to prevent money laundering, financing terrorism, and trade and economic sanctions.',
        p15: 'Please read and understand this privacy policy carefully before using our products (or services).',
        subtitle1: 'I、	How we collect and use your personal information',
        p19: 'Personal information refers to all kinds of information recorded electronically or otherwise, which can be separately or combined with other information to identify the identity of a particular natural person or reflect the activity of a specific natural person.',
        p20: 'IXX will only collect and use your personal information for the registration and related services of this website:',
        p21: 'Mobile phone number/mobile verification code/mailbox/password/invitation code/the front and back of ID card /face recognition/verification video and other information.',
        p22: 'The above information will be stored in the republic of Singapore.If it need transfering across borders, we will obtain your authorization and consent alone.',
        p23: 'We will seek your consent in advance if we will use the information for other purposes not noted in this clause.',
        p24: 'When we want to use the information collected for specific purposes for other purposes, we will ask your consent in advance.',
        subtitle2: 'II、 How we use cookie and similar technologies',
        p28: '1. The Cookie',
        p29: 'To make sure the site works properly, we will store small data files called cookies on your computer or mobile device.Cookies usually contain identifiers, site names, and some numbers and characters.With the help of cookies, websites can store data including your preferences.',
        p30: 'We will not use Cookie for any purpose other than those mentioned in this clause.You can manage or delete cookies based on your preferences.You shall be aware of all the cookies saved by your computer, but if you do this, you may not be able to start or use some of the functions of our website.',
        p31: '2. Other similar technologies',
        p32: ' To make sure the site works properly, we will store a small data file called localStorage on your computer or mobile device.LocalStorage generally contains identifiers, site names, and some Numbers and characters.With the help of localStorage, websites can store data including your preferences.',
        p33: 'We will not use LocalStorage for any purpose other than those mentioned in this clause.You can manage or remove localStorage based on your preferences.You shall be aware of all localStorage saved in your computer, but if you do this, you may not be able to start or use some of the functions of our website.',
        subtitle3: 'III、 How we share, transfer, and publicly disclose your personal information',
        p35: '1. Sharing',
        p36: 'We will not share your personal information with any company, organization or individual other than IXX,,',
        p37: 'Except for following situations:',
        p38: '1.We will share your personal information with others after obtaining your consent.',
        p39: '2.We may share your personal information according to laws and regulations or mandatory requirements of government authorities.',
        p40: '3.Share with our affiliates: your personal information may be Shared with the companys associated with IXX .We will only share the necessary personal information and will be bound by the stated purpose of this privacy clause.If affiliates want to change the purpose of personal information processing, they will ask for your authorization again.',
        p41: '2. Transfer',
        p42: 'We will not transfer your personal information to any company, organization or individual except for following situations:',
        p43: '1. Transfering with clear consent: after obtaining your clear consent, we will transfer your personal information to other parties;',
        p44: '2. In the case of merger, acquisition or bankruptcy liquidation, if personal information transfer is involved, we will require the new company or organization which holds your personal information to continue to be bound by this privacy clause. Otherwise, we will require the company or organization to seek authorization from you again.',
        p45: '3. Public disclosure',
        p46: 'We will disclose your personal information publicly only if:',
        p47: '1. With your clear consent;',
        p48: '2. Law-based disclosure: we may disclose your personal information publicly if compulsively required by law, legal process, litigation or governmental authority.',
        subtitle4: 'IV、 How we protect your personal information',
        p50: '1. We have used industry-standard methods to protect the personal information you provide to prevent it from suffering unauthorized access, public disclosure, use, modification, damage or loss of data.We will take all reasonable and feasible measures to protect your personal information.For example, the exchange of data between your browser and the "service" is protected by SSL encryption; IXX also use the safe browsing of HTTPS provided by us;We will use encryption to ensure data confidentiality: we will use trusted protection mechanisms to protect data from malicious attacks; We will deploy the access control mechanism to ensure that only authorized personnel can access personal information. At the same time we will conduct security and privacy protection training courses to enhance staff awareness of the importance of protecting personal information.',
        p51: '2. We will take all reasonably practicable measures to ensure that no irrelevant personal information is collected. We will only retain your personal information in the period of time to meet the purposes stated in this clause, unless the period of retention is extended or permitted by law.',
        p52: '3. The Internet environment is not absolutely safe, and email, instant messaging, the communication with other IXX users are not encrypted, so we strongly recommend that you do not send personal information in such a way.Please use complex passwords to help us guarantee the security of your account.',
        p53: '4. The Internet environment is not 100% secure and we will do our best to ensure or guarantee the security of any information you send to us.If our physical, technical, or administrative protection facilities are damaged, resulting in the information sufferinf from unauthorized access, public disclosure, tampering, or destruction,which result in damage to your legitimate rights and interests, we will not be liable accordingly.',
        p54: '5. After the unfortunate personal information security incident, we will timely inform you of following situations according to the requirements of the laws and regulations: basic information and possible impacts of the security incident, the disposal measures we have taken or will take, Suggestions of preventing and reducing risks personally, and the remedial measures for you, etc.We will inform you of relevant situations of the event by email, letter, phone, push notification, etc. When it is difficult to inform the owner of individual information one by one, we will issue the announcement in a reasonable and effective way.At the same time, we will actively report the handling of personal information security incidents in accordance with the requirements of the regulatory authorities.',
        subtitle5: 'V、	Your rights',
        p56: 'In accordance with the relevant laws, regulations and standards of Singapore, as well as the prevailing practices in other countries and regions, we guarantee you to exercise of the following rights to your personal information:',
        p57: '1. Browse your personal information',
        p58: 'You have the right to access your personal information other than the exceptions provided by laws and regulations.If you want to exercise of the right to data access, you can access it yourself by following steps:',
        p59: 'Account information - if you want to access or edit your account`s profile and payment information, such as change your password, add security information, etc., you can do this by logging into your personal account.',
        p60: 'If you cannot access these personal information through the link mentioned above, you can contact our website customer service at any time, or send an email to us, we will reply your visit request in one day.',
        p61: 'We will provide other personal information generated by your use of our products or services to you as long as we don`t need to invest too much in. If you want to exercise the of right to data access, please email us.',
        p62: '2. Correct your personal information',
        p63: 'When you find an error in your personal information which we have handled with,you have the right to ask us to make correction. You may apply for a correction through the ways included in section of "(I) Visit your personal information".',
        p64: 'If you cannot correct these personal information through the link mentioned above, you can contact our website customer service at any time or send an email to us, and we will respond to your request of correction within three working days.',
        p65: '3. Delete your personal information',
        p66: 'In the following cases, you can request us to delete your personal information:',
        p67: '1. If we violate the law in the process of dealing with personal information;',
        p68: '2. If we collect and use your personal information without your consent; ',
        p69: '3. If our handling of personal information violates our agreement with you;',
        p70: '4. If we no longer offer you products or services.',
        p71: 'If we decide to respond to your request for deletion, we will also notify the entities that have obtained your personal information from us to delete it timely, unless otherwise provided by law or regulation, or if these entities have your independent authorization.',
        p72: 'When you remove the information from our service, we may not immediately remove the information from the backup system, but will delete it when the backup is updated.',
        p73: '4. Restriction of automatic decision making of information system.',
        p74: 'In some business functions, we base on the non-artificial system of automatic decision such as information systems and algorithms to make decisions.If these decisions significantly affect your lawful rights and interests, you are entitled to request an explanation from us and we will provide appropriate remedies.',
        p75: '5. Respond to your request mentioned above',
        p76: 'For security, you may need to provide a written request, or use other ways to verify your identity.We may ask you to verify your identity before processing your request.',
        p77: 'We will reply within[service@IXX.COM].',
        p78: 'For your reasonable request, we do not charge fees in principle, but we will charge a certain cost for repeated requests that exceed the reasonable limit. We may refuse requests that are gratuitous, require too much technology, pose a risk to the legitimate interests of others, or are highly unrealistic.',
        p79: 'In the following circumstances, we will not be able to respond to your request as required by laws and regulations:',
        p80: '1. Directly related to national security and national defense security;',
        p81: '2. Directly related to public safety, public health and major public interests;',
        p82: '3. Directly related to criminal investigation, prosecution, trial and execution of judgment;',
        p83: '4. There is sufficient evidence to prove that you have subjective malice or abuse of rights;',
        p84: '5. Responding to your request will cause you or other individuals, organizations and legitimate rights and interests to be seriously damaged;',
        p85: '6. Involving trade secrets.',
        subtitle6: 'VI、 How your personal information transfer globally',
        p87: 'Since we provide products or services through a global network of resources and servers, which means that your personal information may be transferred to foreign jurisdictions in the country/region which you use the product or service after obtaining your authorization and may be accessed by them.',
        p88: 'Such jurisdictions may have different data protection laws, or they may not even have them. In such cases, we will ensure that your personal information is equally protected in the republic of Singapore.For example, we will request your consent to the cross-border transfer of personal information or implement security measures such as eliminate identification of data before the cross-border transfer of data.',
        subtitle7: 'VII、 How this clause is updated?',
        p90: 'Our privacy terms may change under following situation:',
        p91: 'In order to provide better services, we will make reasonable modifications to this privacy policy.We will publish any changes of this clause on this page.',
        p92: 'For major changes, we will also provide more obvious notice (including for certain services, we will send notices via email stating the specific changes of the privacy terms).',
        p93: 'Major changes referred to in this clause include but are not limited to:',
        p94: '1. Our service model has changed significantly. For example, the purpose of personal information processing, the type of personal information processing, and the ways to use personal information;',
        p95: '2. We have significant changes in ownership structure, organizational structure, etc. Such as the business adjustment, bankruptcy merger and acquisition cause the changes of the owner;',
        p96: '3. The main objects of personal information sharing, transfer or public disclosure have changed;',
        p104: '4. Your rights to participate in personal information processing and how you exercise of the right mentioned above have changed significantly;',
        p97: '5. We relevant departments for handling personal information security as well as the  contact methods and channel for filing complaints have greatly changed;',
        p98: '6. When the reports of impact assessment on personal information security indicates high risk.',
        p99: 'We will also save the old version of this clause for your looking through.',
        subtitle8: 'VIII、 How to contact us',
        p101: 'If you have any questions, comments or Suggestions about this privacy policy, please contact us by:',
        p102: 'Online customer service and email:[service@IXX.COM]',
        p103: 'Generally, we will reply within one day.'
      },
      'zh-CN': {
        title: '《隐私条款》',
        p1: '本条款仅适用于DVPP. LTD（以下简称“IX”），一家根据新加坡共和国相关法律在新加坡注册成立的公司的数字资产交易及相关服务，包括币币交易、合约或其他衍生品、数字资产资讯等。',
        subtitle11: '最近更新日期：2018年9月12日',
        p3: '如果您有任何疑问、意见或建议，请通过以下联系方式与我们联系：',
        p4: '在线客服及电子邮件：【service@IXX.COM】',
        p5: '本条款将帮助您了解以下内容：',
        p6: '1.	我们如何收集和使用您的个人信息',
        p7: '2.	我们如何使用Cookie和同类技术',
        p8: '3.	我们如何共享、转让、公开披露您的个人信息',
        p9: '4.	我们如何保护您的个人信息',
        p10: '5. 您的权利',
        p11: '6. 您的个人信息如何在全球范围转移',
        p12: '7. 本条款如何更新',
        p13: '8. 如何联系我们',
        p14: 'IX深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，保护您的个人信息，将按照合法、正当、必要的原则使用、收集及处理您的个人信息。同时，IX承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。此外，我们已采取措施，防止洗钱、资助恐怖主义、规避贸易和经济制裁的行为。',
        p15: '请在使用我们的产品（或服务）前，仔细阅读并了解本隐私条款。',
        subtitle1: '一、 我们如何收集和使用您的个人信息',
        p19: '个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。',
        p20: 'IX仅会出于网站的注册及相关服务，收集和使用您的个人信息：',
        p21: '手机号/手机验证码/邮箱/密码/邀请码身份证正反照片/人脸识别/验证视频等信息。',
        p22: '上述信息将存储新加坡共和国境内。如能跨境传输,我们将会单独征得您的授权同意。',
        p23: '当我们要将信息用于本条款未载明的其它用途时，会事先征求您的同意。',
        p24: '当我们要将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。',
        subtitle2: '二、 我们如何使用Cookie和同类技术',
        p28: '（一）Cookie',
        p29: '为确保网站正常运转，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的偏好等数据。',
        p30: '我们不会将Cookie用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookie。您可以清楚计算机保存的所有Cookie，但如果您这么做，则可能出现不便启动或使用我们网站的某些功能的情况。',
        p31: '（二）其他同类技术',
        p32: ' 为确保网站正常运转，我们会在您的计算机或移动设备上存储名为localStorage的小数据文件。localStorage通常包含标识符、站点名称以及一些号码和字符。借助于localStorage，网站能够存储您的偏好等数据。',
        p33: '我们不会将localStorage用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除localStorage。您可以清楚计算机保存的所有localStorage，但如果您这么做，则可能出现不便启动或使用我们网站的某些功能的情况。',
        subtitle3: '三、 我们如何共享、转让、公开披露您的个人信息',
        p35: '（一）共享',
        p36: '我们不会与IX以外的任何公司、组织和个人分享您的个人信息,',
        p37: '以下情况除外：',
        p38: '1、 在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。',
        p39: '2、 我们可能会根据法律法规规定,或按政府主管部门的强制性要求，对外共享您的个人信息。',
        p40: '3、 与我们的关联公司共享：您的个人信息可能会与IX的关联公司共享。我们只会共享必要的个人信息，且受本隐私条款中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。',
        p41: '（二） 转让',
        p42: '我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：',
        p43: '1. 在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；',
        p44: '2. 在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私条款的约束，否则我们将要求该公司、组织重新向您征求授权同意。',
        p45: '（三） 公开披露',
        p46: '我们仅会在以下情况，公开披露您的个人信息：',
        p47: '1. 获得您的明确同意后；',
        p48: '2. 基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。',
        subtitle4: '四、 我们如何保护您的个人信息',
        p50: '(一)	我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据受SSL加密保护；我们同时对IX网站提供https安全浏览方式；我们会使用加密技术确保数据的保密性：我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息：以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。',
        p51: '(二)	我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本条款所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。',
        p52: '(三)	互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他IX用户的交流方式并未加密,我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。',
        p53: '(四)	互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将不会承担相应的法律责任。',
        p54: '(五)	在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您,难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。',
        subtitle5: '五、 您的权利',
        p56: '按照新加坡相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：',
        p57: '（一）访问您的个人信息',
        p58: '您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：',
        p59: '账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息等，您可以通过登陆您的个人账户执行此类操作。',
        p60: '如果您无法通过上述链接访问这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在一日内回复您的访问请求。',
        p61: '对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件给我们。',
        p62: '（二）更正您的个人信息',
        p63: '当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过“（一）访问您的个人信息”中罗列的的方式提出更正申请。',
        p64: '如果您无法通过上述链接更正这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在三个工作日内回复您的更正请求。',
        p65: '（三） 删除您的个人信息',
        p66: '在以下情形中，您可以向我们提出删除个人信息的请求：',
        p67: '1. 如果我们处理个人信息的行为违反法律法规；',
        p68: '2. 如果我们收集、使用您的个人信息，却未征得您的同意；',
        p69: '3. 如果我们处理个人信息的行为违反了与您的约定；',
        p70: '4. 如果我们不再为你提供产品或服务。',
        p71: '若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。',
        p72: '当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。',
        p73: '（四） 约束信息系自动决策',
        p74: '在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。',
        p75: '（五） 响应您的上述请求',
        p76: '为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。',
        p77: '我们将在【service@IXX.COM】内做出答复。',
        p78: '对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情况收取一定成本费用。对于那些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。',
        p79: '在以下情形中，按照法律法规要求，我们将无法响应您的请求：',
        p80: '1. 与国家安全、国防安全直接相关的；',
        p81: '2. 与公共安全、公共卫生、重大公共利益直接相关的；',
        p82: '3. 与犯罪侦查、起诉、审判和判决执行等直接相关的；',
        p83: '4. 有充分证据表明您存在主观恶意或滥用权利的；',
        p84: '5. 响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；',
        p85: '6. 涉及商业秘密的。',
        subtitle6: '六、 您的个人信息如何在全球范围转移',
        p87: '由于我们通过遍布全球的资源和服务器提供产品或服务，这意味着，在获得您的授权同意后，您的个人信息可能会被转移到您使用产品或服务所在国家/地区的境外管辖区，或者受到来自这些管辖区的访问。',
        p88: '此类管辖区可能设有不同的数据保护法，甚至未设立相关法律。在此类情况下，我们会确保您的个人信息得到在新加坡共和国境内足够同等的保护。例如，我们会请求您对跨境转移个人信息的同意，或者在跨境数据转移之前实施数据去标识化等安全举措。',
        subtitle7: '七、本条款如何更新',
        p90: '我们的隐私条款可能变更：',
        p91: '为提供更好的服务，我们会对本隐私条款进行合理修改。我们会在本页面上发布对本条款所做的任何变更。',
        p92: '对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件发送通知，说明隐私条款的具体变更内容）。',
        p93: '本条款所指的重大变更包括但不限于：',
        p94: '1. 我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；',
        p95: '2. 我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；',
        p96: '3. 个人信息共享、转让或公开披露的主要对象发生变化；',
        p104: '4. 您参与个人信息处理方面的权利及其行使方式发生重大变化；',
        p97: '5. 我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；',
        p98: '6. 个人信息安全影响评估报告表明存在高风险时。',
        p99: '我们还会将本条款的旧版本存档，供您查阅。',
        subtitle8: '八、 如何联系我们',
        p101: '如果您对本隐私条款有任何疑问、意见或建议，通过以下方式与我们联系：',
        p102: '在线客服及电子邮箱：【service@IXX.COM】',
        p103: '一般情况下，我们将在一日内回复。'
      }
    //   'ko': {
    //     title: '<프라이버시 조항>',
    //     p1: 'DVPP. LTD에 적용하며 (이하“IX”이라 한다), 싱가포르 공화국의 법에 따라 싱가포르에 등록된 회사로서, 디지털 자산 거래 및 관련 서비스를 제공합니다. 가상화폐간 거래, 계약및 기타 파생상품, 그리고 디지털 자산 정보 등 각종 서비스를 제공합니다. ',
    //     subtitle11: '최신 업데이트 날짜: 2018년9월12일',
    //     p3: '궁금하시는 사항, 의견 혹은 건의가 있으시면,아래 연락처로 문의해주시길 바랍니다.',
    //     p4: '온라인 고객센터 및 메일주소:【service@IXX.COM】',
    //     p5: '本条款본 조항은 고객님이 아래  내용을 이해하시는 데에 도움이 되겠습니다:',
    //     p6: '1.	우리는 어떻게 고객님의 개인정보를 수집하는지 또한 그 정보를 어디에 쓰는지를 알려드리겠습니다.',
    //     p7: '2.	우리가  Cookie 및 다른 같은 종류 기술을 어떻게 쓰는지를 알려드리겠습니다.',
    //     p8: '3.	우리는 어떻게 고객님의 개인정보를 공유,이전 또한 공개하는지를 알려드리겠습니다.',
    //     p9: '4.	우리는 어떻게 고객님의 개인정보를 보호하는지를 알려드리겠습니다.',
    //     p10: '5. 고객니의 권리',
    //     p11: '6. 고객님의 개인정보가 전세계적으로 이전하는 방법.',
    //     p12: '7. 본 조항의 업데이트 방법을 알려드리겠습니다.',
    //     p13: '8. 우리의 연락처.',
    //     p14: 'IX는 개인정보가 고객님에 대한 중요성을 깊이 알고 있으며, 최선을 다하여 고객님의 개인정보를 보호하겠습니다. 고객님이 우리한테 주신 믿음을 중요시하고, 고객님의 개인정보를 보호해드리겠습니다. 합법적, 정규적 그리고 필요적을 원칙으로 삼아, 고객님의 개인정보를 사용, 수집 및 처리하겠습니다. 그 외에도 우리는 돈세탁 ,테러 조직 지원, 그리고 무역 및 경제 제재등 위험회피 조치를 취했습니다.',
    //     p15: '우리의 제품(혹은 서비스)을 사용하기 전에 반드시 본 조항을 읽으시고 확인하여주길 바랍니다.',
    //     subtitle1: '우리는 어떻게 고객님의 개인정보를 수집하는지 또한 그 정보를 어디에 쓰는지를 알려드리겠습니다.',
    //     p19: '개인 정보는 전자 또한 다른방식으로 기록된 단독적으로 혹은 다른 정보과 결합해서,특정한 자연인의 신분을 또한 특정한 자연인의 활동 상황을 반응할 수 있는 다양한 정보를 의미합니다.',
    //     p20: 'IX는 사이트 등록 및 관련 서비스를 제공하는데에 만 고객님의 개인 정보를 수집,사용합니다. ',
    //     p21: '핸드폰번호/폰 인증번호/ 메일 주소/비밀번호 /초청코드 신분증 앞.뒷 면 사진/안면 안식/ 인증 영상 등 정보입니다.',
    //     p22: '위 해당 정보는 싱가포르 공화국 국내에 저장될 것이며,국제 전송이 필요할 경우, 고객님의 동의를 구하겠습니다.',
    //     p23: '정보를 본 조항에 기재하지 않은 타 용도에 쓰게 될 경우,사전에 고객님의 동의를 구하겠습니다.',
    //     p24: '우리는 특정한 목적으로 수집한 정보를 타 용도에 쓰게 될 경우,사전에 고객님의 동의를 구하겠습니다. ',
    //     subtitle2: '우리가  Cookie 및 다른 같은 종류 기술을 어떻게 쓰는지를 알려드리겠습니다.',
    //     p28: '（一）Cookie',
    //     p29: '사이트의 정상적인 접속을 위해 우리는 고객님의 컴퓨터 및 모바일 장치에 Cookie라는 작은 데이터 파일을 설치하겠습니다. Cookie에는 보통식별명, 사이트명, 그리고 번호 및 문자 부호 등 있니다. Cookie를 통해 고객님이 선호하는 데이터를 저장할 수 있습니다.',
    //     p30: '우리는 Cookie를 본 조항에 기재된 용도 외 타 용도로 쓰지 않습니다. 고객님은 개인 취향대로 Cookie를 관리 및 삭제할 수 있습니다.고객님은 컴퓨터에 있는 모든 Cookie를 삭제할 수 있습니다. 단 유의해야할 점은 이로 인해 우리 사이트를 접속할 때 또한 일부 기능을 사용하실 때 불편을 느낄 수 있습니다.',
    //     p31: '（二）다른 같은 종류 기술',
    //     p32: '사이트의 정상적인 접속을 위해 우리는 고객님의 컴퓨터 및 모바일 장치에 localStorage라는 작은 데이터 파일을 설치하겠습다.localStorage에는 보통식별명, 사이트명, 그리고 번호 및 문자 부호 등 있니다. localStorage를 통해 고객님이 선호하는 데이터를 저장할 수 있습니다.',
    //     p33: '우리는 localStorage를 본 조항에 기재된 용도 외 타 용도로 쓰지 않습니다. 고객님은 개인 취향대로localStorage를 관리 및 삭제할 수 있습니다.고객님은 컴퓨터에 있는 모든 localStorage를 삭제할 수 있습니다. 단 유의해야할 점은 이로 인해 우리 사이트를 접속할 때 또한 일부 기능을 사용하실 때 불편을 느낄 수 있습니다.',
    //     subtitle3: '三、고객님의 개인정보를 공유,양도 또한 공개에 관련하여 알려드리겠습니다.',
    //     p35: '（一）공유',
    //     p36: '우리는 IX이외의 회사,조직 그리고 개인 그누구와도 고객님의 개인 정보를 공유하지 않습니다.',
    //     p37: '아래 해당 상황은 예외적 사례입니다:',
    //     p38: '1、 고객님의 동의를 구한 경우,정부 공유: 고객님의 명확한 동의 의사를 확인한 후, 타인와 정보를 공유하겠습니다.',
    //     p39: '2、 법률과 법규에 따라, 혹은 정부 주관부서의 강제적 요구에 따라 고객님의 정보를 공유할 경우.',
    //     p40: '3、 우리 관련 회사와 정보공유: 고객님의 개인정보를 IX관련회사와 공유할 수 있습니다.우리는 필수적인 개인 정보만 공유하며,본 조항에 기재된 사용 목적의구속을 받습니다. 관련 회사가 개인 정보의 처리 목적을 변하려며, 먼저 고객님의 동의를 구한 후 절차를 진행하겠습니다.',
    //     p41: '（二） 양도',
    //     p42: '리는 IX이외의 회사,조직 그리고 개인 그누구에게도 고객님의 개인 정보를 양도하지 않습니다.단 아래 해당 상황은 예외적 사례입니다：',
    //     p43: '1. 고객님의 동의를 구한 경우,정보 양도: 고객님의 명확한 동의 의사를 확인한 후, 타인와 정보를 양도하겠습니다.',
    //     p44: '2. 합병,인수 혹은 파산청산의 경우,개인 정보의 양도에 관련하여,우리는 귀하의 개인 정보를 가지게 될 회사 또한 조직에게 본 조항의 구속을 받아야 한다는 것을 요구할 것이며, 해당 회사 또한 조직이 요구을 거부할 경우, 다시 한 번 귀하의 양도 승인이 받아야할 점 유의하시길 바랍니다.',
    //     p45: '（三） 정보 공개',
    //     p46: '아래의 경우 해당할 때 만, 고객님의 개인 정보를 공개하겠습니다：',
    //     p47: '1. 고객님의 동의를 구한 경우;',
    //     p48: '2. 법률과 법규에 따라, 혹은 정부 주관부서의 강제적 요구에 따라 고객님의 정보를 공유할 경우.',
    //     subtitle4: '四、 우리는 어떻게 고객님의 개인정보를 보호하는지를 알려드리겠습니다.',
    //     p50: '(一)	업계표준에 부합한 안보조치를 투입하여,고객님의 개인 정보를 보호하여, 데이터의 무권한 접속,정보유출,정보 남용, 정보 임의 수정 그리고 데이터 파손 및 분실을 발생하지 않도록 지켜드리겠습니다.우리는 최선을 다하여, 고객님의 개인 정보를 지키겠습니다.예를 들자면,고객님이 웹 브라우저를 사용하여,”서비스”와 데이터를 주고 받은 경우에는 SSL암호보안을 통해데이터를 보호합니다. 동시에 IX사이트를 위한 https 안심 브라우징 버전을 마련되었있습니다;암호보안 기술을 사용하여, 데이터의 기밀성을 보장하겠습니다.믿음직한 보안체제를 구축하여,악의적인 공격으로 고객님의 소중한 데이터를 지키겠습니다.접속통제 시스템을 통해,권한 있는 사용자만 접속가능하도록 확보하겠습니다.뿐만 아니라,저희 직원부터 개인 정보 보호의 중요성을 깊이 인식하기 위해, 안전 및 프라이버시보호에 관련 교육 프로그램을 개설하겠습니다.',
    //     p51: '(二)	최선을 다하여,관련 없는 불필요한 개인 정보를 수집하지 않도록,노력할 것이며,정보 보유기간 연기해야할 경우 혹은 법에 따라 허가를 받은 경우 아닌 이상, 본 조항에 기재된 목적을 달성하는데에 필수적인 기한 안에 만 귀하의 개인 정보를 보유할 것입니다.',
    //     p52: '(三)	인터넷은 절대적인 안전한 환경이 아님으로,특히 메일이나 메신저 또한 다른 IX고객과의 교류는 암호화되지 않은 상황입니다. 그러므로 앞선 언급한 방식으로 개인 정보를 발송하지 말하고 강력히 권고합니다.  복잡한 비밀번호를 쓰시면 아이디 안전을 보장하는 데에 더 유리합니다.',
    //     p53: '(四)	인터넷은 100% 안전한 환경이 아님으로, 우리는 최선을 다하여 고객님이 보내주신 모든 정보의 안전성에 대한 책임지겠습니다.단 우리가 마련된 물리적,기술적,혹은 관리보안시스템이 파괴되었을 때,이로인하여 정보가 불법접속을 당하거나,정보 유출 및 파손 등 상황을 발생해, 고객님에게 권익에 손실이 초래되면, 우리는 법적 책임을 부담하지 않습니다.',
    //     p54: '(五)	불행하게도 개인 정보안전 사고를 발생하면,우리는 법률과 법규에 따라  즉시 고객님에 알려드리겠습니다:안전사고의 기본 상황 또한 미치게 될 해로운 영향,우리가 취할 조치 또한 진행중인 처리 절차 및 진행해야할 처리 방안, 고객님이 스스로 위기 대비 와 위기 해소가능한 의견, 우리가 드릴 수 있는 보완대책 등을 알려드리겠습니다.',
    //     subtitle5: '五、 您的权利',
    //     p56: '按照新加坡相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：',
    //     p57: '（一）고객님의 개인 정보를 확인하기',
    //     p58: '개인정보 접수 확인하는 권리가 있습니다.단 법률과 법규에 따라 지정한 예외인 경우는 제외합니다.데이터조회 권리를 행사하려면 아래 밥벙을 참고하시면 됩니다',
    //     p59: '账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息等，您可以通过登陆您的个人账户执行此类操作。',
    //     p60: '如果您无法通过上述链接访问这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在一日内回复您的访问请求。',
    //     p61: '对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件给我们。',
    //     p62: '（二）更正您的个人信息',
    //     p63: '当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过“（一）访问您的个人信息”中罗列的的方式提出更正申请。',
    //     p64: '如果您无法通过上述链接更正这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在三个工作日内回复您的更正请求。',
    //     p65: '（三） 개인정보를 삭제하기.',
    //     p66: '아래 경우에는 개인정보 삭제 요청을 제출가능합니다：',
    //     p67: '1. 우리가 개인정보를 처리하는 관정에 법률과 법규를 위반한 경우；',
    //     p68: '2. 우리가 고객님의 허락 없이 개인정보를 수집 및 사용할 경우.',
    //     p69: '3. 우리가 개인정보를 처리하는 과정에서 고객님과의 약속을 어기는 경우.',
    //     p70: '4. 우리가 더 이상 고객님에게 제품 혹은 서비스를 제공하지 않을 경우.',
    //     p71: '若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。',
    //     p72: '当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。',
    //     p73: '（四） 约束信息系自动决策',
    //     p74: '在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。',
    //     p75: '（五） 响应您的上述请求',
    //     p76: '为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。',
    //     p77: '我们将在【service@IXX.COM】内做出答复。',
    //     p78: '对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情况收取一定成本费用。对于那些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。',
    //     p79: '在以下情形中，按照法律法规要求，我们将无法响应您的请求：',
    //     p80: '1. 국가언보 및 국방안보와 직접 관련된 경우.',
    //     p81: '2. 공공안전, 공중위생 그리고 중대한 공공이익과 직접 관련된 경우.',
    //     p82: '3. 범죄 수사, 소송,심판 그리고 판결 집행 등 직접 관련이 있을 경우.',
    //     p83: '4. 有充分证据表明您存在主观恶意或滥用权利的；',
    //     p84: '5. 响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；',
    //     p85: '6. 상업기밀과 관련된 경우.',
    //     subtitle6: '六、 고객님의 개인정보가 전세계적으로 이전하는 방법.',
    //     p87: '由于我们通过遍布全球的资源和服务器提供产品或服务，这意味着，在获得您的授权同意后，您的个人信息可能会被转移到您使用产品或服务所在国家/地区的境外管辖区，或者受到来自这些管辖区的访问。',
    //     p88: '此类管辖区可能设有不同的数据保护法，甚至未设立相关法律。在此类情况下，我们会确保您的个人信息得到在新加坡共和国境内足够同等的保护。例如，我们会请求您对跨境转移个人信息的同意，或者在跨境数据转移之前实施数据去标识化等安全举措。',
    //     subtitle7: '七、본 조항의 업데이트 방법을 알려드리겠습니다.',
    //     p90: '我们的隐私条款可能变更：',
    //     p91: '为提供更好的服务，我们会对本隐私条款进行合理修改。我们会在本页面上发布对本条款所做的任何变更。',
    //     p92: '对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件发送通知，说明隐私条款的具体变更内容）。',
    //     p93: '本条款所指的重大变更包括但不限于：',
    //     p94: '1. 我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；',
    //     p95: '2. 我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；',
    //     p96: '3. 个人信息共享、转让或公开披露的主要对象发生变化；',
    //     p104: '4. 您参与个人信息处理方面的权利及其行使方式发生重大变化；',
    //     p97: '5. 우리쪽의 개인정보안전을 맡은 관련 부서,연락처 그리고 신고 루트가 변화했을 때.',
    //     p98: '6. 개인정보 안전영향 평가보고서가 고위험등급으로 나왔을 때.',
    //     p99: '고객님의 편한 조사를 위해, 본 조항의 구버전을 조사용으로 비치하겠습니다. ',
    //     subtitle8: '八、 우리의 연락처',
    //     p101: '본 조항에 대해 궁금하시는 사항, 의견 혹은 건의가 있으시면,아래 연락처로 문의해주시길 바랍니다.',
    //     p102: '온라인 고객센터 및 메일 주소：【service@IXX.COM】',
    //     p103: '일반 경우에는 우리는 1일 안에 답변을 보내드립니다.'
    //   }
    }
  }
}
</script>
<style scoped lang="scss">
    @import "../styles/vars";
    @import "../styles/mixins";
    .page-home{background:#303E4B;}

</style>
