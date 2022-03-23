import React, { Component } from 'react'

class MyLeaderBoardAd extends Component {

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <div>
                <ins className="adsbygoogle"
                    style={{ display: 'block', height: 100}}
                    data-ad-client="ca-pub-9155008277126927"
                    data-ad-slot="5953427427"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>)
    }
}

export default MyLeaderBoardAd