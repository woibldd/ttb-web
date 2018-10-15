export default{
  BTC: {
    'zh-CN': {
      name: 'BTC',
      full_name: '比特币（Bitcoin）',
      brief_info: '比特币（Bitcoin，简称BTC）是目前使用最为广泛的一种数字货币，它诞生于2009年1月3日，是一种点对点（P2P）传输的数字加密货币，总量2100万枚。比特币网络每10分钟释放出一定数量币，预计在2140年达到极限。比特币被投资者称为“数字黄金”。比特币依据特定算法，通过大量的计算产生，不依靠特定货币机构发行，其使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学设计确保货币流通各个环节安全性，可确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实拥有者转移、支付及兑现。同样确保了货币所有权与流通交易的匿名性。',
      issue_time: '2008/11/1',
      issue_all: '2100万', // 发行总量
      issue_circulation: '1673.82万', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮书
      office_website: 'https://bitcoin.org/en', // 官网
      chain_info: 'https://blockchain.info/' // 区块查询
    },
    en: {
      name: 'BTC',
      full_name: 'Bitcoin',
      brief_info: 'Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.',
      issue_time: '2008/11/1',
      issue_all: '21,000,000', // 发行总量
      issue_circulation: '16,789,425', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮书
      office_website: 'https://bitcoin.org/en', // 官网
      chain_info: 'https://blockchain.info/' // 区块查询
    }

  },
  ETH: {
    'zh-CN': {
      name: 'ETH',
      full_name: '以太坊（Ethereum）',
      brief_info: '以太坊（Ethereum）是下一代密码学账本，可以支持众多的高级功能，包括用户发行货币，智能协议，去中心化的交易和设立去中心化自治组织(DAOs)或去中心化自治公司（DACs）。以太坊并不是把每一单个类型的功能作为特性来特别支持，相反，以太坊包括一个内置的图灵完备的脚本语言，允许通过被称为“合同”的机制来为自己想实现的特性写代码。一个合同就像一个自动的代理，每当接收到一笔交易，合同就会运行特定的一段代码，这段代码能修改合同内部的数据存储或者发送交易。',
      issue_time: '2014-07-24',
      issue_all: '9631.15 万', // 发行总量
      issue_circulation: '9631.15 万', // 流通总量
      token_price: '$0.31', // 众筹价格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮书
      office_website: 'https://www.ethereum.org', // 官网
      chain_info: 'https://etherscan.io' // 区块查询
    },
    en: {
      name: 'ETH',
      full_name: 'Ethereum',
      brief_info: 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference.',
      issue_time: '2014-07-24',
      issue_all: '96,847,288', // 发行总量
      issue_circulation: '96,847,288', // 流通总量
      token_price: '$0.308', // 众筹价格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮书
      office_website: 'https://www.ethereum.org', // 官网
      chain_info: 'https://etherscan.io' // 区块查询
    }
  },
  EOS: {
    'zh-CN': {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: 'EOS (Enterprise Operation System)是由 Block.one公司主导开发的一种全新的基于区块链智能合约平台，旨在为高性能分布式应用提供底层区块链平台服务。EOS 项目的目标是实现一个类似操作系统的支撑分布式应用程序的区块链架构。该架构可以提供账户，身份认证，数据库，异步通信以及可在数以万计的 CPU/GPU群集上进行程序调度和并行运算。EOS最终可以支持每秒执行数百万个交易，同时普通用户执行智能合约无需支付使用费用。 ',
      issue_time: '2017-07-02',
      issue_all: '10亿', // 发行总量
      issue_circulation: '5.36亿', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮书
      office_website: 'https://eos.io/', // 官网
      chain_info: 'https://etherscan.io/token/EOS' // 区块查询
    },
    en: {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: 'EOS tokens are ERC-20 compatible tokens distributed on the Ethereum blockchain pursuant to a related ERC-20 smart contract (the “EOS Tokens”). EOS featured in powerful infrastructure for decentralized application and token distribution takes place over 341 days.',
      issue_time: '2017-07-02',
      issue_all: '1000 million', // 发行总量
      issue_circulation: '536 million', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮书
      office_website: 'https://eos.io/', // 官网
      chain_info: 'https://etherscan.io/token/EOS' // 区块查询
    }
  }
}
