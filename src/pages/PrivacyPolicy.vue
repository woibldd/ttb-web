<template>
<div class="page-home">
  <div class="header">
    <v-nav2 isHome="true" :notice="notice" @hide="notice = null"></v-nav2>
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
    <p>{{ $t('p16') }}</p>
    <p>{{ $t('p17') }}</p>
    <ul>
      <li>{{ $t('p18') }}</li>
      <li>{{ $t('p19') }}</li>
      <li>{{ $t('p20') }}</li>
      <li>{{ $t('p21') }}</li>
      <li>{{ $t('p22') }}</li>
      <li>{{ $t('p23') }}</li>
      <li>{{ $t('p24') }}</li>
      <li>{{ $t('p25') }}</li>
      <li>{{ $t('p26') }}</li>
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
        title: '隐私条款',
        p1: '本条款仅适用于DVPP. LTD.（以下简称“IX”），一家根据新加坡共和国相关法律在新加坡注册成立的公司的数字资产交易及相关服务，包括币币交易、合约或其他衍生品、数字资产资讯等。',
        subtitle11: '最近更新日期：2018年9月12日',
        p3: '如果您有任何疑问、意见或建议，请通过以下联系方式与我们联系：',
        p4: '在线客服及电子邮件：【】',
        p5: '本条款将帮助您了解以下内容：',
        p6: '1.	我们如何收集和使用您的个人信息',
        p7: '2.	我们如何使用Cookie和同类技术',
        p8: '3.	我们如何共享、转让、公开披露您的个人信息',
        p9: '4.	我们如何保护您的个人信息',
        p10: '	5. 您的权利',
        p11: '	6. 您的个人信息如何在全球范围转移',
        p12: '	7. 本条款如何更新',
        p13: '	8. 如何联系我们',
        p14: 'IX深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，保护您的个人信息，将按照合法、正当、必要的原则使用、收集及处理您的个人信息。同时，IX承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。此外，我们已采取措施，防止洗钱、资助恐怖主义、规避贸易和经济制裁的行为。',
        subtitle1: '一、 我们如何收集和使用您的个人信息',
        p15: '请在使用我们的产品（或服务）前，仔细阅读并了解本隐私条款。',
        p16: '个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。',
        p17: 'IX仅会出于本条款所述的以下目的，收集和使用您的个人信息：',
        p18: '1、业务功能一：注册',
        p19: '为完成注册服务，您需提供以下信息：国籍/手机号/手机验证码/邮箱/密码/邀请码等其记载在www.ix.com（以下称“网站”）注册界面的信息。',
        p20: '上述信息将存储新加坡共和国境内。如能跨境传输,我们将会单独征得您的授权同意。',
        p21: '2、业务功能二：提现',
        p22: '为完成提现服务，您需提供以下信息：姓名/身份证号码/护照号码等其记载在网站提现界面的信息。',
        p23: '3、业务功能三：点对点交易',
        p24: '为完成点对点交易服务，您需提供以下信息：身份证正反照片/人脸识别/验证视频等其记载在网站点对点界面的信息。',
        p25: '当我们要将信息用于本条款未载明的其它用途时，会事先征求您的同意。',
        p26: '当我们要将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。',
        subtitle2: '二、 我们如何使用Cookie和同类技术',
        p28: '（一）Cookie',
        p29: '为确保网站正常运转，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的偏好等数据。',
        p30: '我们不会将Cookie用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookie。您可以清楚计算机保存的所有Cookie，但如果您这么做，则可能出现不便启动或使用我们网站的某些功能的情况。',
        p31: '（二）其他同类技术',
        p32: '为确保网站正常运转，我们会在您的计算机或移动设备上存储名为localStorage的小数据文件。localStorage通常包含标识符、站点名称以及一些号码和字符。借助于localStorage，网站能够存储您的偏好等数据。',
        p33: '我们不会将localStorage用于本条款所述目的之外的任何用途。您可根据自己的偏好管理或删除localStorage。您可以清楚计算机保存的所有localStorage，但如果您这么做，则可能出现不便启动或使用我们网站的某些功能的情况。',
        subtitle3: '三、	我们如何共享、转让、公开披露您的个人信息',
        p35: '（一）共享',
        p36: '我们不会与IX以外的任何公司、组织和个人分享您的个人信息,',
        p37: '以下情况除外：',
        p38: '1、	在获取明确同意的情况下共享：获得您的明确同意后,我们会与其他方共享您的个人信息。',
        p39: '2、	我们可能会根据法律法规规定,或按政府主管部门的强制性要求，对外共享您的个人信息。',
        p40: '3、	与我们的关联公司共享：您的个人信息可能会与IX的关联公司共享。我们只会共享必要的个人信息，且受本隐私条款中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。',
        p41: '（二）转让',
        p42: '我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：',
        p43: '1.	在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；',
        p44: '2.	在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私条款的约束，否则我们将要求该公司、组织重新向您征求授权同意。',
        p45: '（三）公开披露',
        p46: '我们仅会在以下情况，公开披露您的个人信息：',
        p47: '1.	获得您的明确同意后；',
        p48: '2.	基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。',
        subtitle4: '四、	我们如何保护您的个人信息',
        p50: '(一)	我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据受SSL加密保护；我们同时对IX网站提供https安全浏览方式；我们会使用加密技术确保数据的保密性：我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息：以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。',
        p51: '(二)	我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本条款所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。',
        p52: '(三)	互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他IX用户的交流方式并未加密,我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。',
        p53: '(四)	互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将不会承担相应的法律责任。',
        p54: '(五)	在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您,难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。',
        subtitle5: '五、	您的权利',
        p56: '按照新加坡相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：',
        p57: '（一）访问您的个人信息',
        p58: '您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：',
        p59: '账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息等，您可以通过登陆您的个人账户执行此类操作。',
        p60: '如果您无法通过上述链接访问这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在【】内回复您的访问请求。',
        p61: '对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件给我们。',
        p62: '（二）	更正您的个人信息',
        p63: '当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过“（一）访问您的个人信息”中罗列的的方式提出更正申请。',
        p64: '如果您无法通过上述链接更正这些个人信息，您可以随时与我们的网站客服联系，或发送电子邮件给我们，我们将在三个工作日内回复您的更正请求。',
        p65: '（三）	删除您的个人信息',
        p66: '在以下情形中，您可以向我们提出删除个人信息的请求：',
        p67: '1.	如果我们处理个人信息的行为违反法律法规；',
        p68: '2.	如果我们收集、使用您的个人信息，却未征得您的同意；',
        p69: '3.	如果我们处理个人信息的行为违反了与您的约定；',
        p70: '4.	如果我们不再为你提供产品或服务。',
        p71: '若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。',
        p72: '当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。',
        p73: '（四）	约束信息系自动决策',
        p74: '在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。',
        p75: '（五）	响应您的上述请求',
        p76: '为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。',
        p77: '我们将在【】内做出答复。',
        p78: '对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情况收取一定成本费用。对于那些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。',
        p79: '在以下情形中，按照法律法规要求，我们将无法响应您的请求：',
        p80: '1.	与国家安全、国防安全直接相关的；',
        p81: '2.	与公共安全、公共卫生、重大公共利益直接相关的；',
        p82: '3.	与犯罪侦查、起诉、审判和判决执行等直接相关的；',
        p83: '4.	有充分证据表明您存在主观恶意或滥用权利的；',
        p84: '5.	响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；',
        p85: '6.	涉及商业秘密的。',
        subtitle6: '六、	您的个人信息如何在全球范围转移',
        p87: '由于我们通过遍布全球的资源和服务器提供产品或服务，这意味着，在获得您的授权同意后，您的个人信息可能会被转移到您使用产品或服务所在国家/地区的境外管辖区，或者受到来自这些管辖区的访问。',
        p88: '此类管辖区可能设有不同的数据保护法，甚至未设立相关法律。在此类情况下，我们会确保您的个人信息得到在新加坡共和国境内足够同等的保护。例如，我们会请求您对跨境转移个人信息的同意，或者在跨境数据转移之前实施数据去标识化等安全举措。',
        subtitle7: '七、	本条款如何更新',
        p90: '我们的隐私条款可能变更：',
        p91: '为提供更好的服务，我们会对本隐私条款进行合理修改。我们会在本页面上发布对本条款所做的任何变更。',
        p92: '对于重大变更，我们还会提供更为显著的通知（包括对于某些服务，我们会通过电子邮件发送通知，说明隐私条款的具体变更内容）',
        p93: '本条款所指的重大变更包括但不限于：',
        p94: '1.	我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；',
        p95: '2.	我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；',
        p96: '3.	个人信息共享、转让或公开披露的主要对象发生变化；',
        p104: '4.	您参与个人信息处理方面的权利及其行使方式发生重大变化；',
        p97: '5.	我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；',
        p98: '6.	个人信息安全影响评估报告表明存在高风险时。',
        p99: '我们还会将本条款的旧版本存档，供您查阅。',
        subtitle8: '八、	如何联系我们',
        p101: '如果您对本隐私条款有任何疑问、意见或建议，通过以下方式与我们联系：',
        p102: '在线客服及电子邮箱：【】',
        p103: '一般情况下，我们将在【】内回复。',



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