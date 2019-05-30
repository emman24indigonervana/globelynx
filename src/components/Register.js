import React from 'react'
import { navigate } from 'gatsby'

import './Styles/Register.scss'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class RegisterSection extends React.Component {
  constructor() {
    super()
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
        document.querySelector('#postcode').focus()
        break
      default:
        document.querySelector('#contactnumber').focus()
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row  has-text-centered has-padding">
            <div className="twelve column">
              <div className="is-fullwidth">
                <div className="container-fluid">
                  <form
                    name="register"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="register" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{' '}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="row">
                      <div className="three columns">
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
                      <div className="three columns">
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
                      <div className="three columns">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            name={'postcode'}
                            onChange={this.handleChange}
                            id={'postcode'}
                            required={true}
                          />
                          <label
                            className="form-control-placeholder"
                            id="label3"
                            onClick={this.placeholderClick}
                          >
                            Postcode
                          </label>
                        </div>
                      </div>
                      <div className="three columns">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="number"
                            name={'contactnumber'}
                            onChange={this.handleChange}
                            id={'contactnumber'}
                            required={true}
                          />
                          <label
                            className="form-control-placeholder"
                            id="label4"
                            onClick={this.placeholderClick}
                          >
                            Contact Number
                          </label>
                        </div>
                        <button
                          className="button is-dark register-submit"
                          style={{ marginTop: '15px', float: 'right' }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RegisterSection
