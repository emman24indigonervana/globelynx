import React from 'react'
import { Link, navigate } from 'gatsby'

// import footerform from '../img/footer-form.png'
// import footernews from '../img/footer-news.png'
import './Styles/Footer.scss'
import { Timeline } from 'react-twitter-widgets'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <>
        <footer
          className={`${
            this.props.location === 'dashboard'
              ? 'is-display-none'
              : 'is-fullwidth has-background-blue'
          }`}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="twelve columns">
                <h1
                  className=" has-text-centered"
                  style={{ color: '#fff', marginBottom: 0 }}
                >
                  CONTACT
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="one columns" />
              <div className="four columns">
                <ul className="footer-lists" style={{ padding: 0 }}>
                  <li>
                    <Link to="/experts">Experts</Link>
                  </li>
                  <li>
                    <Link to="/contact">Become a Globelynx Expert</Link>
                  </li>
                  <li>
                    <Link to="/cameras">Globelynx Cameras</Link>
                  </li>
                  <li>
                    <Link to="/contact">Registration now</Link>
                  </li>
                  <li>
                    <Link to="/products">Services</Link>
                  </li>
                  {/* <li>
                    <Link to="/">Privacy Policy and Terms and Condition</Link>
                  </li> */}
                </ul>
              </div>
              <div className="three columns" style={{ textAlign: 'center' }}>
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'Globelynx',
                  }}
                  options={{
                    username: 'Globelynx',
                    height: '200',
                    width: '320',
                  }}
                  onLoad={() => console.log('Timeline is loaded!')}
                />
              </div>
              <div className="four columns">
                <form
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="footer-form-container">
                    <div className="six columns">
                      <input
                        type="text"
                        className="footer-form-input is-fullwidth"
                        placeholder="Name*"
                        name={'name'}
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                      />
                      <input
                        type="email"
                        className="footer-form-input is-fullwidth"
                        placeholder="Email*"
                        name={'email'}
                        onChange={this.handleChange}
                        id={'email'}
                        required={true}
                      />
                      <input
                        type="number"
                        className="footer-form-input is-fullwidth"
                        placeholder="Telephone*"
                        name={'phone'}
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                      />
                    </div>
                    <div className="six columns">
                      <textarea
                        className="footer-form-textarea is-fullwidth"
                        placeholder="Message*"
                        name={'message'}
                        onChange={this.handleChange}
                        id={'message'}
                        required={true}
                      />
                      <button
                        className="is-fullwidth footer-form-submit"
                        type="submit"
                      >
                        Send
                      </button>
                    </div>
                    <div className="footer-link-container">
                      <a
                        href="mailto:mail@globelynx.com"
                        className="footer-a-link"
                      >
                        <i className="fa fa-envelope footer-form-icon" />
                        <span className="footer-icon-span">
                          mail@globelynx.com
                        </span>
                      </a>
                      <a href="tel:442079637061" className="footer-a-link">
                        <i
                          className="fa fa-phone footer-form-icon"
                          style={{ transform: 'rotate(90deg)' }}
                        />
                        <span className="footer-icon-span">
                          +44-207-963-7061
                        </span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}

export default Footer
