## [1.11.1](https://github.com/etclabscore/json-schema-to-types/compare/1.11.0...1.11.1) (2020-04-11)


### Bug Fixes

* **go:** fix Golang class getSafeTitle ([39bf83b](https://github.com/etclabscore/json-schema-to-types/commit/39bf83b9c96f72d50e5529dbbdec55081bcbb284))
* **go:** title leading non-cap alpha chars ([7b3365e](https://github.com/etclabscore/json-schema-to-types/commit/7b3365e281288a5887cd5174198e85f010c1035d))

# [1.11.0](https://github.com/etclabscore/json-schema-to-types/compare/1.10.1...1.11.0) (2020-04-07)


### Bug Fixes

* readme typo ([0bd4c09](https://github.com/etclabscore/json-schema-to-types/commit/0bd4c09aabdb2b10edb79218d7399ad9c7f873c4))
* update deps ([e55444f](https://github.com/etclabscore/json-schema-to-types/commit/e55444fdac8c02930c0be555ca2fcc5b155f9291))
* **README:** npm install ([e9c9a0d](https://github.com/etclabscore/json-schema-to-types/commit/e9c9a0d091d76b034a8dfc4b00c8a0801d62c5b3))
* add section about using test generator ([0084c6e](https://github.com/etclabscore/json-schema-to-types/commit/0084c6e9d98e74d9d6ee7d25f6b28af503d72d75))
* update docs with features ([8b9a264](https://github.com/etclabscore/json-schema-to-types/commit/8b9a264c4794ff89df03d1d5ec8b97cc577364d3))


### Features

* greatly improve integration test suite ([4efa066](https://github.com/etclabscore/json-schema-to-types/commit/4efa066a9fdd594a8c023c11a29919f85575795f))

## [1.10.1](https://github.com/etclabscore/json-schema-to-types/compare/1.10.0...1.10.1) (2020-01-23)


### Bug Fixes

* make tests pass ([518cb83](https://github.com/etclabscore/json-schema-to-types/commit/518cb83f9ace91008c9c6410bc2ec20ef398f80a))
* **rust:** missing HashMap dep ([ce742ae](https://github.com/etclabscore/json-schema-to-types/commit/ce742ae8012f14252a1300a322f07b91e5441462))
* **rust:** ordering of prefix and include serde methods ([4b5ca5d](https://github.com/etclabscore/json-schema-to-types/commit/4b5ca5d1d1ef3c2c9f6f4c3d308b1335560b703f))
* dont include integration tests in published package ([750f064](https://github.com/etclabscore/json-schema-to-types/commit/750f0647ac1166b3d73a33160d041957d8a7d7d1))
* rust is missing some quotes ([2fc8410](https://github.com/etclabscore/json-schema-to-types/commit/2fc841029316de4b27d82559b855743b9bb7ffbc))
* test now reflects proper quoting ([b1c8d25](https://github.com/etclabscore/json-schema-to-types/commit/b1c8d252bc103ab1e43da8aba5bb2260889fabb7))

# [1.10.0](https://github.com/etclabscore/json-schema-to-types/compare/1.9.0...1.10.0) (2020-01-16)


### Bug Fixes

* many bug fixes from using proper schema ([d28a22c](https://github.com/etclabscore/json-schema-to-types/commit/d28a22c928e4716125f58ea46e7da1a4a213e8b7))
* millions of issues uncovered by ts types ([1955823](https://github.com/etclabscore/json-schema-to-types/commit/19558230fc8fbfe11da75cdb190de11b4fdcb943))
* rebase issues ([b731cae](https://github.com/etclabscore/json-schema-to-types/commit/b731caeac16d9f3cc1115c9da90dad9b6e57ab19))
* respect that properties can be undefined ([0ed7b95](https://github.com/etclabscore/json-schema-to-types/commit/0ed7b95ed48480542454f49ef082d77978e8df69))


### Features

* dogfood by using meta schemas schema that uses self ([417c16e](https://github.com/etclabscore/json-schema-to-types/commit/417c16e99cd0bbdfd67e2c7f493b08e7c422a7bd))

# [1.9.0](https://github.com/etclabscore/json-schema-to-types/compare/1.8.0...1.9.0) (2020-01-15)


### Bug Fixes

* cleanups ([c3746d9](https://github.com/etclabscore/json-schema-to-types/commit/c3746d96657b66e6576bbe5889ddec8b9638c54b))
* fix a bug with generating enums ([d616a0c](https://github.com/etclabscore/json-schema-to-types/commit/d616a0cfc392a36c76239925640d19d927812376))
* get tests all passing except the one crazy one ([8f93ebf](https://github.com/etclabscore/json-schema-to-types/commit/8f93ebf1a40c32981dbd519242c117fe11ffe44b))
* implement naive fix for [#44](https://github.com/etclabscore/json-schema-to-types/issues/44) ([0e9c0c4](https://github.com/etclabscore/json-schema-to-types/commit/0e9c0c4a67ee7326dfa94e2999ea4fe56e29ed22))
* regenerate package-lock ([41854cc](https://github.com/etclabscore/json-schema-to-types/commit/41854cc681734a164f2bed63426060d5c613f527))
* remove commented code ([5e434e7](https://github.com/etclabscore/json-schema-to-types/commit/5e434e7637465eef5fcd2b8926901cf3bebc55e6))


### Features

* Massive fix to circular reference detection & more ([1cb967b](https://github.com/etclabscore/json-schema-to-types/commit/1cb967b9431fc1991c9222203b22e2ab94dc809c))

# [1.8.0](https://github.com/etclabscore/json-schema-to-types/compare/1.7.2...1.8.0) (2020-01-11)


### Bug Fixes

* install missing types ([61245bd](https://github.com/etclabscore/json-schema-to-types/commit/61245bd00d9290d0b13a63f7142d2c0bf221ea78))
* update package lock ([daf4391](https://github.com/etclabscore/json-schema-to-types/commit/daf4391f4f0de41ddfd30f306f0e94ce18b29ba7))


### Features

* handle circular references with grace ([82eed56](https://github.com/etclabscore/json-schema-to-types/commit/82eed568342bded9f797eeed5d5f254154d469e9)), closes [#14](https://github.com/etclabscore/json-schema-to-types/issues/14)

## [1.7.2](https://github.com/etclabscore/json-schema-to-types/compare/1.7.1...1.7.2) (2020-01-07)


### Bug Fixes

* set node-version to lts ([d009b47](https://github.com/etclabscore/json-schema-to-types/commit/d009b47d96a76ff79a64e4a3b19a0986085cc277))
* use lts node version in circle ([63af88a](https://github.com/etclabscore/json-schema-to-types/commit/63af88acaab383b2e26f73da4825304cc57bee0c))

## [1.7.1](https://github.com/etclabscore/json-schema-to-types/compare/1.7.0...1.7.1) (2020-01-07)


### Bug Fixes

* run audit fix ([a38ec83](https://github.com/etclabscore/json-schema-to-types/commit/a38ec830e64e707f6a8d4f3d12670ae3a3d9bd9c))

# [1.7.0](https://github.com/etclabscore/json-schema-to-types/compare/1.6.3...1.7.0) (2020-01-06)


### Bug Fixes

* believe it or not, more test cov ([06d933f](https://github.com/etclabscore/json-schema-to-types/commit/06d933f8026878e6fb03fa6da5a9ade1d2fd3b24))
* even more test coverage, done now ([d831bc0](https://github.com/etclabscore/json-schema-to-types/commit/d831bc006b417fabd726431bfba1d6938a8a2774))
* even. more. test. coverage. ([3172e6b](https://github.com/etclabscore/json-schema-to-types/commit/3172e6b89fb1716eeb8f19942095fb7e64726537))
* get things going ([7993c45](https://github.com/etclabscore/json-schema-to-types/commit/7993c45479abd8651f70142cf7fdfa439c95b964))
* get things ordered appropriately ([afd1886](https://github.com/etclabscore/json-schema-to-types/commit/afd1886216ee3e5ab392743db057925d069730d3))
* handle additionalProperties a tiny bit better ([0fc770e](https://github.com/etclabscore/json-schema-to-types/commit/0fc770e524f11de2cedae6e08d7b09f2965fc847))
* handle untyped array ([6a0d98c](https://github.com/etclabscore/json-schema-to-types/commit/6a0d98c1d3ab9034b14d12ed6b07f1b84f57c535))
* implement generate docsString ([fd27444](https://github.com/etclabscore/json-schema-to-types/commit/fd2744435f8139e0d64e283386c74f14ca3b8faa))
* improve coverage more ([b45adcd](https://github.com/etclabscore/json-schema-to-types/commit/b45adcd8652394edad9636b0eb8dfd9e9f596860))
* improve test coverage ([1d84c43](https://github.com/etclabscore/json-schema-to-types/commit/1d84c438ec71b8997ab1b213989276f47b2927de))
* missing getsafetitle ([564536f](https://github.com/etclabscore/json-schema-to-types/commit/564536f3df9adbb5cd92026ea4c90e8aa227bc2a))
* more test coverage ([48870b8](https://github.com/etclabscore/json-schema-to-types/commit/48870b8fc28ca2185e9de889034cb40451ac362a))
* more test fix ([38063fc](https://github.com/etclabscore/json-schema-to-types/commit/38063fc90ef812b45daf6886497994b49e42adab))
* nodegyp madness ([c3fa453](https://github.com/etclabscore/json-schema-to-types/commit/c3fa45304735fb9c1daf6137a50f303b1a251561))
* remove trash ([b446234](https://github.com/etclabscore/json-schema-to-types/commit/b44623448904205a776f328a8065e7dcebc05219))
* restore package lock ([9f31d01](https://github.com/etclabscore/json-schema-to-types/commit/9f31d01c1d3cdd78c9ba851c84d426dd686dca17))
* update docs ([f7ff074](https://github.com/etclabscore/json-schema-to-types/commit/f7ff074d145a17f94332cc0acf4ea7f171e7d38f))
* update generate method ([c0bf381](https://github.com/etclabscore/json-schema-to-types/commit/c0bf3819d6b8e8edd98b1e96c0e4c40a66957d50))


### Features

* enums ([ccd5ed4](https://github.com/etclabscore/json-schema-to-types/commit/ccd5ed4141cf6a9025775c787567909f38916b80))
* handle anyof ([3c7f7ff](https://github.com/etclabscore/json-schema-to-types/commit/3c7f7ffd6edeeaa0b7cf94defbdd51bec381f027))
* handle object mostly ([6f3c83f](https://github.com/etclabscore/json-schema-to-types/commit/6f3c83f8f9717cb1979c17bf3a9dbf8a86110a3d))
* handle oneOf ([6aadc99](https://github.com/etclabscore/json-schema-to-types/commit/6aadc99e3123e5267005f2d01b02bd9d8a841fac))
* handle ordered array ([5a4be6a](https://github.com/etclabscore/json-schema-to-types/commit/5a4be6a1ebe432146a0b351529ab399e518c89e5))
* handle unordered array ([72df431](https://github.com/etclabscore/json-schema-to-types/commit/72df4316684aebfe08cc7f81f9d55cbd781db20a))
* implement anyOf ([838c37e](https://github.com/etclabscore/json-schema-to-types/commit/838c37ecf303950f1633faefbbf7a69610ff1794))
* null and untyped ([766fb31](https://github.com/etclabscore/json-schema-to-types/commit/766fb319489b6e8939d3add538010458e1a036e8))
* python ([41ca89f](https://github.com/etclabscore/json-schema-to-types/commit/41ca89ff6e71566ba87001fbae7b0af7a4e53ae4))
* untyped object ([c78b4a1](https://github.com/etclabscore/json-schema-to-types/commit/c78b4a1676c88f7a74f85dbf6c496bd8af82da68))

## [1.6.3](https://github.com/etclabscore/json-schema-to-types/compare/1.6.2...1.6.3) (2019-11-19)


### Bug Fixes

* code generation to handle required on object ([a480a8e](https://github.com/etclabscore/json-schema-to-types/commit/a480a8e0a0f6f8cb98e73de5fd6d5fc6bf92847a)), closes [#36](https://github.com/etclabscore/json-schema-to-types/issues/36)

## [1.6.2](https://github.com/etclabscore/json-schema-to-types/compare/1.6.1...1.6.2) (2019-11-13)


### Bug Fixes

* add node env version ([ef92d49](https://github.com/etclabscore/json-schema-to-types/commit/ef92d49cd505e4c48c83b09195b332f10bb1cfaf))
* deterministic titles ([7cbad4d](https://github.com/etclabscore/json-schema-to-types/commit/7cbad4d5661a98333614a33283d15be01347ca63)), closes [#33](https://github.com/etclabscore/json-schema-to-types/issues/33)
* finish test fixing ([2f21035](https://github.com/etclabscore/json-schema-to-types/commit/2f210350842cb304c148240a16ab99fcac3bd7f6))
* more extra imports ([f921171](https://github.com/etclabscore/json-schema-to-types/commit/f9211712bae921806519c83eee167189b8e27b70))
* more extras ([0914694](https://github.com/etclabscore/json-schema-to-types/commit/0914694bfe3d286db5782151e0e700c5e5b71768))
* remove console log ([c845b1b](https://github.com/etclabscore/json-schema-to-types/commit/c845b1b3d001a3713e59da6890dd8b7e7e9d9492))
* remove extra fn ([05492ee](https://github.com/etclabscore/json-schema-to-types/commit/05492ee3debd716ad67072bbb09b46179f3a7160))
* remove extra imports ([368f616](https://github.com/etclabscore/json-schema-to-types/commit/368f61690dcf9a53cafbf65632b8304d6d79314f))
* remove more extra ([775d510](https://github.com/etclabscore/json-schema-to-types/commit/775d5104f45f79ec8980a06fce80352afe4d2aa4))
* reorganize things a little ([c8a5b1b](https://github.com/etclabscore/json-schema-to-types/commit/c8a5b1b61777043b64d4b1811c86ae356cf5b91e))
* unbreak all tests ([75b6795](https://github.com/etclabscore/json-schema-to-types/commit/75b6795138b6cab83b60ffbfdf15ec7f35073a01))

## [1.6.1](https://github.com/etclabscore/json-schema-to-types/compare/1.6.0...1.6.1) (2019-11-06)


### Bug Fixes

* additional props ([8734c42](https://github.com/etclabscore/json-schema-to-types/commit/8734c4215de1dd7468796278ac9bd1d306eb07c2)), closes [#31](https://github.com/etclabscore/json-schema-to-types/issues/31)

# [1.6.0](https://github.com/etclabscore/json-schema-to-types/compare/1.5.0...1.6.0) (2019-11-06)


### Features

* make required work properly ([bf5ae6c](https://github.com/etclabscore/json-schema-to-types/commit/bf5ae6c9a5ee223cb6da920d097642377884733a)), closes [#25](https://github.com/etclabscore/json-schema-to-types/issues/25)

# [1.5.0](https://github.com/etclabscore/json-schema-to-types/compare/1.4.1...1.5.0) (2019-11-06)


### Features

* add golang support ([40b203b](https://github.com/etclabscore/json-schema-to-types/commit/40b203b6b1a0cc6b8981bca9c7bccdb71688a509))

## [1.4.1](https://github.com/etclabscore/json-schema-to-types/compare/1.4.0...1.4.1) (2019-11-06)


### Bug Fixes

* add broken test for [#26](https://github.com/etclabscore/json-schema-to-types/issues/26) ([d8394ae](https://github.com/etclabscore/json-schema-to-types/commit/d8394ae515133d4212552755d4ad4c3524c2505e))
* duplicate issue ([30e6a1d](https://github.com/etclabscore/json-schema-to-types/commit/30e6a1d9e9ef646a18ef02a31fc834bddaba5a8f)), closes [#26](https://github.com/etclabscore/json-schema-to-types/issues/26)

# [1.4.0](https://github.com/etclabscore/json-schema-to-types/compare/1.3.0...1.4.0) (2019-11-05)


### Bug Fixes

* style change ([4d298b1](https://github.com/etclabscore/json-schema-to-types/commit/4d298b189bd2c39f912f9c0467935b43b5ce1241))
* wrong name ([436ff60](https://github.com/etclabscore/json-schema-to-types/commit/436ff609e3a19a1f5833ce65ad7a642fe036e83f))


### Features

* add docs ([ecbb102](https://github.com/etclabscore/json-schema-to-types/commit/ecbb1025ee574ffe0e6f76e586808f9bcae90e83))

# [1.3.0](https://github.com/etclabscore/json-schema-to-types/compare/1.2.1...1.3.0) (2019-11-05)


### Bug Fixes

* update tsdoc tox ([41b1722](https://github.com/etclabscore/json-schema-to-types/commit/41b1722eef6aa9fdec076c1967eb5dd5b9e1b14b))


### Features

* push functionality into usils ([b9795da](https://github.com/etclabscore/json-schema-to-types/commit/b9795da2b71290f43013352dfdbf5acbd0adf7d7))

## [1.2.1](https://github.com/etclabscore/json-schema-to-types/compare/1.2.0...1.2.1) (2019-11-05)


### Bug Fixes

* friendly titles ([31de569](https://github.com/etclabscore/json-schema-to-types/commit/31de569369cb74700bf23b316a0f5096d998cdf5))
* using some lodash stuff ([845c1c4](https://github.com/etclabscore/json-schema-to-types/commit/845c1c45d77572c82f37b75830c340226e746873))

# [1.2.0](https://github.com/etclabscore/json-schema-to-types/compare/1.1.1...1.2.0) (2019-10-30)


### Features

* add generic interface ([a1757a7](https://github.com/etclabscore/json-schema-to-types/commit/a1757a7069b2d3f34b5a9591a340d4232d004c64))

## [1.1.1](https://github.com/etclabscore/json-schema-to-types/compare/1.1.0...1.1.1) (2019-10-30)


### Bug Fixes

* package directory was broken ([1e90033](https://github.com/etclabscore/json-schema-to-types/commit/1e90033a31504682dbadee580914fdf35fb0f344))

# [1.1.0](https://github.com/etclabscore/json-schema-to-types/compare/1.0.1...1.1.0) (2019-10-29)


### Bug Fixes

* update readme with batching feature ([5762d95](https://github.com/etclabscore/json-schema-to-types/commit/5762d95a94a463656a8034af840702f9881de0ae))


### Features

* add batch schema support ([17ce188](https://github.com/etclabscore/json-schema-to-types/commit/17ce188400f53b82473f2917a714ccdd8b3ea5c5)), closes [#16](https://github.com/etclabscore/json-schema-to-types/issues/16)

## [1.0.1](https://github.com/etclabscore/json-schema-to-types/compare/1.0.0...1.0.1) (2019-10-29)


### Bug Fixes

* gh pages docs broken ([b3639d9](https://github.com/etclabscore/json-schema-to-types/commit/b3639d95143d1febca8891e04f44d8305841eabd))

# 1.0.0 (2019-10-28)


### Bug Fixes

* add readme stuff ([e07de72](https://github.com/etclabscore/json-schema-to-types/commit/e07de72b06a70bf60bad3589d3c1ac925e3d6b3d))
* add typedoc ([47336cb](https://github.com/etclabscore/json-schema-to-types/commit/47336cb8a3364f8eb27013f1c3b228cd32121730))
* all tests passing ([7328f33](https://github.com/etclabscore/json-schema-to-types/commit/7328f3304b41f2180ded4e0de7328efeab9e5c02)), closes [#1](https://github.com/etclabscore/json-schema-to-types/issues/1)
* get rust integration tests working ([f936cee](https://github.com/etclabscore/json-schema-to-types/commit/f936ceed534f4ec1dc165ca2edbd9f09710894c5))
* improve coverage ([a2030a0](https://github.com/etclabscore/json-schema-to-types/commit/a2030a03578566f1b4ef6ac21df03ea8852a454b))
* linting error ([0496093](https://github.com/etclabscore/json-schema-to-types/commit/0496093fcf432a09e69c59bdc447489b710eeae0))
* more docs ([4e97266](https://github.com/etclabscore/json-schema-to-types/commit/4e97266b3c731ff3db3eb64880121167f952ea9c))
* more testing ([49167fb](https://github.com/etclabscore/json-schema-to-types/commit/49167fb6600b86781b93481af0f1ba47be3930e2))
* move dep to devdep ([d5a10bb](https://github.com/etclabscore/json-schema-to-types/commit/d5a10bb13752eed9b0f8e1f8a4327bef1b0c713f))
* refactor and add docs ([f038374](https://github.com/etclabscore/json-schema-to-types/commit/f038374b4644cc232dc3974a71aab8f89e5aa844))
* remove extra deps ([08d965f](https://github.com/etclabscore/json-schema-to-types/commit/08d965f81239cece6e8767ad9e7e660ccba8681b)), closes [#9](https://github.com/etclabscore/json-schema-to-types/issues/9)
* remove extra deps ([700b515](https://github.com/etclabscore/json-schema-to-types/commit/700b51503cf9cba2d400b797661b1e6c04e06125))
* rust fixes ([87dbde6](https://github.com/etclabscore/json-schema-to-types/commit/87dbde63e79f96a474f93139dcb37f4acca7d8be))
* update packagejson ([5b50dcb](https://github.com/etclabscore/json-schema-to-types/commit/5b50dcb976ac6a9ec91bcc8597451b8423dc466e))
* upgrade deps ([8c9c3d6](https://github.com/etclabscore/json-schema-to-types/commit/8c9c3d6c7239838e92f071656751db717fd7a370))


### Features

* get things started ([730bc98](https://github.com/etclabscore/json-schema-to-types/commit/730bc983b0e116a23f2c188516872da9569db41d))
* **ts:** add typescript generator ([19ecc9a](https://github.com/etclabscore/json-schema-to-types/commit/19ecc9a1cb5d2ad3d5c071e45d3256312af40eb1))
* rust ([0da1761](https://github.com/etclabscore/json-schema-to-types/commit/0da176179c5df3ee4f4c78c4f6f21c3536eac530))
* traverse ([c9200c4](https://github.com/etclabscore/json-schema-to-types/commit/c9200c40d7432077da41a100f9da72b314af79af))
* wipwip ([d2c2add](https://github.com/etclabscore/json-schema-to-types/commit/d2c2add02452c6f081290537999c7c143da55065))
