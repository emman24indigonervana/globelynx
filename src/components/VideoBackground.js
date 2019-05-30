import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class VideoBackground extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // url: 'dPJZyDh5rms'
      url: 'dPJZyDh5rms',
      end: 52,
    }
  }

  getNextState() {
    if (this.state.postType === 'star_rating') return { postType: 'image_poll' }
    if (this.state.postType === 'image_poll') return { postType: 'third_state' }
    return { postType: 'star_rating' }
  }

  componentDidMount() {
    // let timer;
    // let dataurl;
    // let dataend;
    // let i = 0
    // if(	this.props.location === 'homepage'){
    // 	this.interval = setInterval(() => {
    // 		i += 1000
    // 			if(this.state.url === 'dPJZyDh5rms' ){
    // 				dataurl = '5HDuNU8l5NY'
    // 				timer= 52000
    // 				dataend = 52
    // 				if(i >= timer){
    // 				this.setState({url: dataurl, end: dataend});
    // 				i = 0;
    // 				}
    // 			}else{
    // 				dataurl = 'dPJZyDh5rms'
    // 				timer= 65000
    // 				dataend = 65
    // 				if(i >= timer){
    // 					this.setState({url: dataurl, end: dataend});
    // 					i = 0;
    // 					}
    // 			}
    // 		console.log(i)
    // 	}, 1000);
    // }
  }

  componentWillUnmount() {
    // if(	this.props.location === 'homepage'){
    // 	clearInterval(this.interval);
    // }
  }

  render() {
    return (
      <div
        className={
          this.props.location === 'homepage'
            ? 'video-foreground'
            : 'is-display-none'
        }
      >
        <iframe
          title="Globelynx Video Background"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${
            this.state.url
          }?modestbranding=1&mute=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=${
            this.state.url
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/*<iframe
						title="Globelynx Video Background"
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${this.state.url}?modestbranding=1&mute=1&start=00&end=${this.state.end}&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=${this.state.url}`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>*/}
      </div>
    )
  }
}

VideoBackground.propTypes = {
  location: PropTypes.string,
}
