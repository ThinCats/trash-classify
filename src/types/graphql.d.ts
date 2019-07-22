export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
  examples__JSON: any
}

export type DailyArticle = {
  __typename?: 'DailyArticle'
  id: Scalars['ID']
  article: Scalars['String']
}

export type Fake__Color = {
  red255?: Maybe<Scalars['Int']>
  green255?: Maybe<Scalars['Int']>
  blue255?: Maybe<Scalars['Int']>
}

export enum Fake__ImageCategory {
  Abstract = 'abstract',
  Animals = 'animals',
  Business = 'business',
  Cats = 'cats',
  City = 'city',
  Food = 'food',
  Nightlife = 'nightlife',
  Fashion = 'fashion',
  People = 'people',
  Nature = 'nature',
  Sports = 'sports',
  Technics = 'technics',
  Transport = 'transport'
}

export enum Fake__Locale {
  Az = 'az',
  Cz = 'cz',
  De = 'de',
  DeAt = 'de_AT',
  DeCh = 'de_CH',
  En = 'en',
  EnAu = 'en_AU',
  EnBork = 'en_BORK',
  EnCa = 'en_CA',
  EnGb = 'en_GB',
  EnIe = 'en_IE',
  EnInd = 'en_IND',
  EnUs = 'en_US',
  EnAuOcker = 'en_au_ocker',
  Es = 'es',
  EsMx = 'es_MX',
  Fa = 'fa',
  Fr = 'fr',
  FrCa = 'fr_CA',
  Ge = 'ge',
  IdId = 'id_ID',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
  NbNo = 'nb_NO',
  Nep = 'nep',
  Nl = 'nl',
  Pl = 'pl',
  PtBr = 'pt_BR',
  Ru = 'ru',
  Sk = 'sk',
  Sv = 'sv',
  Tr = 'tr',
  Uk = 'uk',
  Vi = 'vi',
  ZhCn = 'zh_CN',
  ZhTw = 'zh_TW'
}

export enum Fake__LoremSize {
  Word = 'word',
  Words = 'words',
  Sentence = 'sentence',
  Sentences = 'sentences',
  Paragraph = 'paragraph',
  Paragraphs = 'paragraphs'
}

export type Fake__Options = {
  /** Only for type `streetAddress` */
  useFullAddress?: Maybe<Scalars['Boolean']>
  /** Only for type `money` */
  minMoney?: Maybe<Scalars['Float']>
  /** Only for type `money` */
  maxMoney?: Maybe<Scalars['Float']>
  /** Only for type `money` */
  decimalPlaces?: Maybe<Scalars['Int']>
  /** Only for type `imageUrl` */
  imageWidth?: Maybe<Scalars['Int']>
  /** Only for type `imageUrl` */
  imageHeight?: Maybe<Scalars['Int']>
  /** Only for type `imageUrl` */
  imageCategory?: Maybe<Fake__ImageCategory>
  /** Only for type `imageUrl` */
  randomizeImageUrl?: Maybe<Scalars['Boolean']>
  /** Only for type `email` */
  emailProvider?: Maybe<Scalars['String']>
  /** Only for type `password` */
  passwordLength?: Maybe<Scalars['Int']>
  /** Only for type `lorem` */
  loremSize?: Maybe<Fake__LoremSize>
  /** Only for types `*Date`. Example value: `YYYY MM DD`. [Full Specification](http://momentjs.com/docs/#/displaying/format/) */
  dateFormat?: Maybe<Scalars['String']>
  /** Only for type `colorHex`. [Details here](https://stackoverflow.com/a/43235/4989887) */
  baseColor?: Maybe<Fake__Color>
  /** Only for type `number` */
  minNumber?: Maybe<Scalars['Float']>
  /** Only for type `number` */
  maxNumber?: Maybe<Scalars['Float']>
  /** Only for type `number` */
  precisionNumber?: Maybe<Scalars['Float']>
}

export enum Fake__Types {
  ZipCode = 'zipCode',
  City = 'city',
  StreetName = 'streetName',
  /** Configure address with option `useFullAddress` */
  StreetAddress = 'streetAddress',
  SecondaryAddress = 'secondaryAddress',
  County = 'county',
  Country = 'country',
  CountryCode = 'countryCode',
  State = 'state',
  StateAbbr = 'stateAbbr',
  Latitude = 'latitude',
  Longitude = 'longitude',
  ColorName = 'colorName',
  ProductCategory = 'productCategory',
  ProductName = 'productName',
  /** Sum of money. Configure with options `minMoney`/`maxMoney` and 'decimalPlaces'. */
  Money = 'money',
  ProductMaterial = 'productMaterial',
  Product = 'product',
  CompanyName = 'companyName',
  CompanyCatchPhrase = 'companyCatchPhrase',
  CompanyBs = 'companyBS',
  DbColumn = 'dbColumn',
  DbType = 'dbType',
  DbCollation = 'dbCollation',
  DbEngine = 'dbEngine',
  /** Configure date format with option `dateFormat` */
  PastDate = 'pastDate',
  /** Configure date format with option `dateFormat` */
  FutureDate = 'futureDate',
  /** Configure date format with option `dateFormat` */
  RecentDate = 'recentDate',
  FinanceAccountName = 'financeAccountName',
  FinanceTransactionType = 'financeTransactionType',
  CurrencyCode = 'currencyCode',
  CurrencyName = 'currencyName',
  CurrencySymbol = 'currencySymbol',
  BitcoinAddress = 'bitcoinAddress',
  InternationalBankAccountNumber = 'internationalBankAccountNumber',
  BankIdentifierCode = 'bankIdentifierCode',
  HackerAbbr = 'hackerAbbr',
  HackerPhrase = 'hackerPhrase',
  /** An image url. Configure image with options: `imageCategory`, `imageWidth`, `imageHeight` and `randomizeImageUrl` */
  ImageUrl = 'imageUrl',
  /** An URL for an avatar */
  AvatarUrl = 'avatarUrl',
  /** Configure email provider with option: `emailProvider` */
  Email = 'email',
  Url = 'url',
  DomainName = 'domainName',
  Ipv4Address = 'ipv4Address',
  Ipv6Address = 'ipv6Address',
  UserAgent = 'userAgent',
  /** Configure color with option: `baseColor` */
  ColorHex = 'colorHex',
  MacAddress = 'macAddress',
  /** Configure password with option `passwordLength` */
  Password = 'password',
  /** Lorem Ipsum text. Configure size with option `loremSize` */
  Lorem = 'lorem',
  FirstName = 'firstName',
  LastName = 'lastName',
  FullName = 'fullName',
  JobTitle = 'jobTitle',
  PhoneNumber = 'phoneNumber',
  Number = 'number',
  Uuid = 'uuid',
  Word = 'word',
  Words = 'words',
  Locale = 'locale',
  Filename = 'filename',
  MimeType = 'mimeType',
  FileExtension = 'fileExtension',
  Semver = 'semver'
}

export type FileType = {
  __typename?: 'FileType'
  filename?: Maybe<Scalars['String']>
  mimetype?: Maybe<Scalars['String']>
}

export type HtmlType = {
  __typename?: 'HTMLType'
  src: Scalars['String']
  js: Array<Scalars['String']>
  css: Array<Scalars['String']>
}

export type ImagePosition = {
  __typename?: 'ImagePosition'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  top?: Maybe<Scalars['Float']>
  left?: Maybe<Scalars['Float']>
}

export type Mutation = {
  __typename?: 'Mutation'
  uploadImageByURL: UploadImageResponse
  uploadImageByFile: UploadImageResponse
  uploadImage: FileType
}

export type MutationUploadImageByUrlArgs = {
  imgURL?: Maybe<Scalars['String']>
}

export type MutationUploadImageByFileArgs = {
  imgFile: Scalars['Upload']
}

export type MutationUploadImageArgs = {
  imgFile: Scalars['Upload']
}

export type PropheticError = {
  __typename?: 'PropheticError'
  name?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  extensions?: Maybe<PropheticErrorExtensions>
}

export type PropheticErrorExtensions = {
  __typename?: 'PropheticErrorExtensions'
  code?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  errors: Array<PropheticError>
  trash?: Maybe<Trash>
  trashList: Array<Trash>
  dailyArticle: DailyArticle
}

export type QueryTrashArgs = {
  name: TrashQueryArg
}

export type QueryTrashListArgs = {
  trashNameList: Array<TrashQueryArg>
}

export type TaggedImageResult = {
  __typename?: 'TaggedImageResult'
  keyword?: Maybe<Scalars['String']>
  score?: Maybe<Scalars['Float']>
  root?: Maybe<Scalars['String']>
}

export type Trash = {
  __typename?: 'Trash'
  type: TrashType
  name: Scalars['String']
  id: Scalars['ID']
  extraInfo: TrashExtraInfo
}

export type TrashExtraInfo = {
  __typename?: 'TrashExtraInfo'
  id: Scalars['ID']
  degrateTime: Scalars['Float']
  degrateWay: Scalars['String']
  about: Scalars['String']
  category: Scalars['String']
}

export type TrashQueryArg = {
  keyword: Scalars['String']
  root: Scalars['String']
}

export type TrashType = {
  __typename?: 'TrashType'
  id: Scalars['ID']
  name: Scalars['String']
}

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse'
  taggedImageResult: Array<TaggedImageResult>
  taggedImagePosition: ImagePosition
}
export type ArticleQueryVariables = {}

export type ArticleQuery = { __typename?: 'Query' } & {
  dailyArticle: { __typename?: 'DailyArticle' } & Pick<
    DailyArticle,
    'id' | 'article'
  >
}

export type ListQueryVariables = {
  trashQueryList: Array<TrashQueryArg>
}

export type ListQuery = { __typename?: 'Query' } & {
  trashList: Array<
    { __typename?: 'Trash' } & Pick<Trash, 'id' | 'name'> & {
        type: { __typename?: 'TrashType' } & Pick<TrashType, 'id' | 'name'>
        extraInfo: { __typename?: 'TrashExtraInfo' } & Pick<
          TrashExtraInfo,
          'id' | 'degrateTime'
        >
      }
  >
}

export type UploadImgMutationVariables = {
  image: Scalars['Upload']
}

export type UploadImgMutation = { __typename?: 'Mutation' } & {
  uploadImageByFile: { __typename?: 'UploadImageResponse' } & {
    taggedImageResult: Array<
      { __typename?: 'TaggedImageResult' } & Pick<
        TaggedImageResult,
        'keyword' | 'score' | 'root'
      >
    >
    taggedImagePosition: { __typename?: 'ImagePosition' } & Pick<
      ImagePosition,
      'width' | 'height' | 'top' | 'left'
    >
  }
}

export type UploadImageByUrlMutationVariables = {
  imgURL?: Maybe<Scalars['String']>
}

export type UploadImageByUrlMutation = { __typename?: 'Mutation' } & {
  uploadImageByURL: { __typename?: 'UploadImageResponse' } & {
    taggedImageResult: Array<
      { __typename?: 'TaggedImageResult' } & Pick<
        TaggedImageResult,
        'keyword' | 'score' | 'root'
      >
    >
    taggedImagePosition: { __typename?: 'ImagePosition' } & Pick<
      ImagePosition,
      'width' | 'height' | 'top' | 'left'
    >
  }
}
