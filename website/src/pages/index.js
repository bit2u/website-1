import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button, ButtonGroup, Row, Col, Container } from 'reactstrap';
import styles from './styles.module.css';
import '../css/custom.css';
import '../css/bootstrap.css';

const jsExample = `
// JS
function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result;
}
`;

const neonExample = `
// Neon
fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let result = cx.number(fibonacci(10000));
  println!("{}", result);
  Ok(result)
}`;

const exampleCode = `
fn make_an_array(mut cx: FunctionContext) -> JsResult<JsArray> {
  // Create some values:
  let n = cx.number(9000);
  let s = cx.string("hello");
  let b = cx.boolean(true);
  // Create a new array:
  let array: Handle<JsArray> = cx.empty_array();
  // Push the values into the array:
  array.set(&mut cx, 0, n)?;
  array.set(&mut cx, 1, s)?;
  array.set(&mut cx, 2, b)?;
  // Return the array:
  Ok(array)
}
register_module!(mut cx, {
  // Export the Rust function as a JS function
  cx.export_function("makeAnArray", make_an_array)
})
`;

const asyncExample = `
fn fibonacci_async(mut cx: FunctionContext) -> JsResult<JsUndefined> {
  let n = cx.argument::<JsNumber>(0)?.value() as usize;
  let cb = cx.argument::<JsFunction>(1)?;

  let task = FibonacciTask { argument: n };
  task.schedule(cb);

  Ok(cx.undefined())
}
`;

const printArgsExample = `
// Create a function that gets the number of arguments passed to it
fn get_args_len(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let args_length = cx.len();
    println!("{}", args_length);
    Ok(cx.number(args_length))
}
`;

const codeExamples = [
  {
    name: 'Async Fibonacci',
    code: asyncExample
  },
  {
    name: 'Make Array',
    code: neonExample
  },
  {
    name: 'Print Function Arguments',
    code: printArgsExample
  }
];

const Logo = props => (
  <div className="neonProjectLogo">
    <div className="neon-logo">
      <span className="open neon-heading neon-flicker-blink">
        {props.title}
      </span>
      <span className="hrs neon-subheading">{props.subtitle}</span>
    </div>
  </div>
);

const features = [
  {
    title: <>Simple Tooling</>,
    imageUrl: 'img/hammer.svg',
    description: (
      <>No makefiles. No fancy global build requirements. Just Node and Rust</>
    )
  },
  {
    title: <>Guaranteed Safety</>,
    description: (
      <>
        If a neon module compiles, it is guaranteed to be memory safe by the
        rust compiler
      </>
    ),
    imageUrl: 'img/checkmark.svg'
  },
  {
    title: <>Easy Parallelism</>,
    description: <>Safely run multiple threads without data races</>,
    imageUrl: 'img/fork.svg'
  }
];

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExampleIdx: 0,
      currentCode: codeExamples[0].code
    };
  }

  onButtonClick(index) {
    this.setState({
      currentExampleIdx: index,
      currentCode: codeExamples[index].code
    });
  }

  render() {
    return (
      <>
        <ButtonGroup>
          {codeExamples.map((example, idx) => (
            <Button
              color={
                this.state.currentExampleIdx === idx ? 'primary' : 'secondary'
              }
              key={example.name}
              onClick={() => this.onButtonClick(idx)}
            >
              {example.name}
            </Button>
          ))}
        </ButtonGroup>
        <SyntaxHighlighter language="rust">
          {this.state.currentCode}
        </SyntaxHighlighter>
      </>
    );
  }
}

// Concatenate a given array of styles
const cStyles = _styles => _styles.join(' ');

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <header className={cStyles([styles.header, styles.containerOdd])}>
        <Container>
          <Col xs="12" className="text-center">
            <Logo title={siteConfig.title} subtitle={siteConfig.tagline} />
            <Row>
              <Col xs={6} className="text-left">
                <SyntaxHighlighter
                  customStyle={{ fontSize: '0.8em' }}
                  language="javascript"
                  useInlineStyles
                >
                  {jsExample}
                </SyntaxHighlighter>
              </Col>
              <Col xs={6} className="text-left">
                <SyntaxHighlighter
                  customStyle={{ fontSize: '0.8em' }}
                  language="rust"
                  useInlineStyles
                >
                  {neonExample}
                </SyntaxHighlighter>
              </Col>
            </Row>
            <Row className={styles.buttons}>
              <ButtonGroup>
                <a href={useBaseUrl('docs/getting-started')}>
                  <Button color="primary">Try It Out</Button>
                </a>
                <a href={siteConfig.repoUrl}>
                  <Button color="primary" target="_blank">
                    GitHub
                  </Button>
                </a>
                <a href="https://neon-bindings.com/api/neon/index.html">
                  <Button color="primary" target="_blank">
                    API
                  </Button>
                </a>
              </ButtonGroup>
            </Row>
          </Col>
        </Container>
      </header>

      <main className={cStyles([styles.features, styles.containerEven])}>
        <Col xs="12" className="text-center">
          <h3>Features</h3>
        </Col>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container container-home">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div
                    key={styles.feature}
                    className={classnames('col col--4', styles.feature)}
                  >
                    <img
                      className={styles.featureImage}
                      src={useBaseUrl(imageUrl)}
                      alt={title}
                    />
                    <h3>{title}</h3>

                    <p className={styles.featureDescription}>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={cStyles([styles.features, styles.containerOdd])}>
          <Container>
            <Col xs="12" className="text-center">
              <h3>Examples</h3>
            </Col>
            <Col xs="12">
              <Carousel />
            </Col>
          </Container>
        </section>

        <section className={cStyles([styles.features, styles.containerEven])}>
          <Container>
            <Col xs="12" className="text-center">
              <h3>Demo</h3>
            </Col>
            <Col xs="12">
              <div className="container container-home">
                <iframe
                  src="https://asciinema.org/a/269799/iframe"
                  width="100%"
                  height="300px"
                />
              </div>
            </Col>
          </Container>
        </section>
      </main>
    </Layout>
  );
}
export default Home;
