import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants.ts'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea.tsx'
import { useEffect } from 'react'
import { translate } from './services/translate.ts'
import { useDebounce } from './hooks/useDebounce.ts'

function App () {
  const { fromLanguage, toLanguage, fromText, result, loading, setFromLanguage, setToLanguage, setFromText, setResult, interchangeLanguages } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [fromText, fromLanguage, toLanguage])

  const handleClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
      <Container fluid>
          <h1>Google Translate</h1>
          <Row>
              <Col xs={'auto'}>
                  <Stack gap={2}>
                      <LanguageSelector
                          type={SectionType.From}
                          value={fromLanguage}
                          onChange={setFromLanguage}
                      />
                      <TextArea
                          type={SectionType.From}
                          loading={loading}
                          onChange={setFromText}
                          value={fromText}
                      />
                  </Stack>
              </Col>
              <Col>
                  <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                      <ArrowsIcon/>
                  </Button>
              </Col>
              <Col xs={'auto'}>
                  <Stack gap={2}>
                      <LanguageSelector
                          type={SectionType.To}
                          value={toLanguage}
                          onChange={setToLanguage}
                      />
                      <div style={{ position: 'relative' }}>
                          <TextArea
                              type={SectionType.To}
                              loading={loading}
                              onChange={setResult}
                              value={result}
                          />
                          <div style={{ position: 'absolute', right: 0, bottom: 0, display: 'flex' }}>
                              <Button
                                  variant="link"
                                  onClick={handleClipBoard}
                              >
                                  <ClipboardIcon/>
                              </Button>
                              <Button
                                  variant="link"
                                  onClick={handleSpeaker}
                              >
                                  <SpeakerIcon/>
                              </Button>
                          </div>

                      </div>

                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
