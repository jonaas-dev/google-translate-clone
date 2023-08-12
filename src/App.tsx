import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Form, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants.ts'
import { ArrowsIcon } from './components/icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { SectionType } from './types.d'

function App () {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage, interchangeLanguages } = useStore()
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
                      <Form.Control
                          as={'textarea'}
                          placeholder="Enter text"
                          autoFocus
                          style={{ height: '150px' }}
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
                      <Form.Control
                          as={'textarea'}
                          placeholder="Translation"
                          style={{ height: '150px' }}
                      />
                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
