import React, { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
// import Farm from './Farm'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import PageMeta from './PageMeta'
import Menu from '../components/Menu'

const Swap = lazy(() => import('./Swap'))
const Pool = lazy(() => import('./Pool'))
const PoolFinder = lazy(() => import('./PoolFinder'))
const RemoveLiquidity = lazy(() => import('./RemoveLiquidity'))
const MigrateV1 = lazy(() => import('./MigrateV1'))
const MigrateV1Exchange = lazy(() => import('./MigrateV1/MigrateV1Exchange'))
const AddLiquidity = lazy(() => import('./AddLiquidity'))
const RemoveV1Exchange = lazy(() => import('./MigrateV1/RemoveV1Exchange'))

const RedirectOldRemoveLiquidityPathStructure = lazy(
  () => import('./RemoveLiquidity/redirects').then(
    r => ({
      default: r.RedirectOldRemoveLiquidityPathStructure,
    })
  )
)

const redirectSwap = () => import('./Swap/redirects')
const RedirectPathToSwapOnly = lazy(
  async () => redirectSwap().then(r => ({
    default: r.RedirectPathToSwapOnly
  }))
)
const RedirectToSwap = lazy(
  async () => redirectSwap().then(r => ({
    default: r.RedirectToSwap
  }))
)

const redirectAddLiquidity = () => import('./AddLiquidity/redirects')
const RedirectDuplicateTokenIds = lazy(
  async () => redirectAddLiquidity().then(r => ({
    default: r.RedirectDuplicateTokenIds
  }))
)
const RedirectOldAddLiquidityPathStructure = lazy(
  async () => redirectAddLiquidity().then(r => ({
    default: r.RedirectOldAddLiquidityPathStructure
  }))
)
const RedirectToAddLiquidity = lazy(
  async () => redirectAddLiquidity().then(r => ({
    default: r.RedirectToAddLiquidity
  }))
)

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  min-height: calc(100vh - 152px);
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  background-image: url('/static/media/bg.bfd323f2.png');
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6

  const credentials: Credentials = {
    token: apiKey
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter(language => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem('apeSwapLanguage')
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then(translationApiResponse => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch(error => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <PageMeta />
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/swap" component={Swap} />
                      <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                      <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                      <Route exact strict path="/find" component={PoolFinder} />
                      <Route exact strict path="/pool" component={Pool} />
                      <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                      <Route exact path="/add" component={AddLiquidity} />
                      <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                      <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
                      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                      <Route exact strict path="/migrate/v1" component={MigrateV1} />
                      <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
                      <Route component={RedirectPathToSwapOnly} />
                    </Switch>
                  </Web3ReactManager>
                  <Marginer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

export default App
