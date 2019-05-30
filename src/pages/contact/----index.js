import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

import contactmap from '../../img/map.jpg'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
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

  placeholderClick(e) {
    switch (e.target.id) {
      case 'label1':
        document.querySelector('#name').focus()
        break
      case 'label2':
        document.querySelector('#email').focus()
        break
      case 'label3':
        document.querySelector('#phone').focus()
        break
      default:
        document.querySelector('#message').focus()
    }
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="is-fullwidth has-background-gray">
            <div className="container">
              <div className="row has-padding">
                <div className="six column">
                  <h1>Contact</h1>
                  <p>
                    For sales enquiries, broadcaster requests or general info,
                    call or email us
                  </p>
                  <h2>Email</h2>
                  <p>Mail@Globelynx.com</p>
                  {/* <h2>Telephone</h2>
                  <p>
										Available 7am to 6pm
                  </p>*/}
                  <h2>24/7 Support</h2>
                  <p>
                    {/*Live broadcasts are supported from our*/} 24/7 support
                    team - +44 (0)20 7963 7174
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="six columns has-padding">
              <h1>Contact Us</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'} />
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      required={true}
                    />
                    <label
                      className="form-control-placeholder"
                      id="label1"
                      onClick={this.placeholderClick}
                    >
                      Full Name
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'} />
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                    <label
                      className="form-control-placeholder"
                      id="label2"
                      onClick={this.placeholderClick}
                    >
                      Email
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'} />
                  <div className="form-group">
                    <input
                      className="form-control"
                      type={'number'}
                      name={'phone'}
                      onChange={this.handleChange}
                      id={'phone'}
                      required={true}
                    />
                    <label
                      className="form-control-placeholder"
                      id="label3"
                      onClick={this.placeholderClick}
                    >
                      Telephone
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'} />
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                    />
                    <label
                      className="form-control-placeholder"
                      id="label4"
                      onClick={this.placeholderClick}
                    >
                      Message
                    </label>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="six columns has-padding">
              <h1>Location</h1>
              <p>292 Vauxhall Bridge Road, London, SW1V 1AE </p>
              <a
                href="https://www.google.co.uk/maps/place/London+SW1V+1AE/@51.4951753,-0.1413923,17z/data=!3m1!4b1!4m2!3m1!1s0x487605200cfb49b1:0xf39f996cfaea3bd5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={contactmap} alt={contactmap} />
              </a>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
