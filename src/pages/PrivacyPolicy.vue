<template>
  <div class="page-home">
    <div class="header" v-if="!isMobile">
      <v-nav2 is-home="true" />
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
import utils from '@/modules/utils'
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      isMobile: utils.isMobile(),
    } 
  },
  components: {
    VNav2,
    DocWrap
  },
  i18n: {
    messages: {
      en: {
        title: 'Privacy Agreement Of IXX',
        p1: 'This clause only applies to IXX DIGITAL PRIVATE LIMITED (hereinafter referred to as "IXX"), a company registered in Singapore under the relevant laws of the Republic Of Singapore, which provides digital asset transaction and related services that include currency transaction, contract or other derivatives, digital asset information, etc.',
        subtitle11: 'Updated date: September 12, 2018',
        p3: 'If you have any questions, comments or suggestions, please contact us through the following contact information:',
        p4: 'Online customer service and email:[server@ttb.plus]',
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
        p77: 'We will reply within[server@ttb.plus].',
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
        p102: 'Online customer service and email:[server@ttb.plus]',
        p103: 'Generally, we will reply within one day.'
      },
      'zh-CN': {
        title: '《隐私条款》',
        p1: '本条款仅适用于IXX DIGITAL PRIVATE LIMITED（以下简称“IXX”），一家根据新加坡共和国相关法律在新加坡注册成立的公司的数字资产交易及相关服务，包括币币交易、合约或其他衍生品、数字资产资讯等。',
        subtitle11: '最近更新日期：2018年9月12日',
        p3: '如果您有任何疑问、意见或建议，请通过以下联系方式与我们联系：',
        p4: '在线客服及电子邮件：【server@ttb.plus】',
        p5: '本条款将帮助您了解以下内容：',
        p6: '1.	我们如何收集和使用您的个人信息',
        p7: '2.	我们如何使用Cookie和同类技术',
        p8: '3.	我们如何共享、转让、公开披露您的个人信息',
        p9: '4.	我们如何保护您的个人信息',
        p10: '5. 您的权利',
        p11: '6. 您的个人信息如何在全球范围转移',
        p12: '7. 本条款如何更新',
        p13: '8. 如何联系我们',
        p14: 'IXX深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，保护您的个人信息，将按照合法、正当、必要的原则使用、收集及处理您的个人信息。同时，IXX承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。此外，我们已采取措施，防止洗钱、资助恐怖主义、规避贸易和经济制裁的行为。',
        p15: '请在使用我们的产品（或服务）前，仔细阅读并了解本隐私条款。',
        subtitle1: '一、 我们如何收集和使用您的个人信息',
        p19: '个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。',
        p20: 'IXX仅会出于网站的注册及相关服务，收集和使用您的个人信息：',
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
        p36: '我们不会与IXX以外的任何公司、组织和个人分享您的个人信息,',
        p37: '以下情况除外：',
        p38: '1、 在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。',
        p39: '2、 我们可能会根据法律法规规定,或按政府主管部门的强制性要求，对外共享您的个人信息。',
        p40: '3、 与我们的关联公司共享：您的个人信息可能会与IXX的关联公司共享。我们只会共享必要的个人信息，且受本隐私条款中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。',
        p41: '（二） 转让',
        p42: '我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：',
        p43: '1. 在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；',
        p44: '2. 在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私条款的约束，否则我们将要求该公司、组织重新向您征求授权同意。',
        p45: '（三） 公开披露',
        p46: '我们仅会在以下情况，公开披露您的个人信息：',
        p47: '1. 获得您的明确同意后；',
        p48: '2. 基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。',
        subtitle4: '四、 我们如何保护您的个人信息',
        p50: '(一)	我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据受SSL加密保护；我们同时对IXX网站提供https安全浏览方式；我们会使用加密技术确保数据的保密性：我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息：以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。',
        p51: '(二)	我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本条款所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。',
        p52: '(三)	互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他IXX用户的交流方式并未加密,我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。',
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
        p77: '我们将在【server@ttb.plus】内做出答复。',
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
        p102: '在线客服及电子邮箱：【server@ttb.plus】',
        p103: '一般情况下，我们将在一日内回复。'
      } 
    }
  }
}
</script>
<style scoped lang="scss">
.page-home{background:#303E4B;} 
</style>
