import React from 'react'
import Nav from './Nav'

const Home = props => {
    return (
        <div>
            <nav>
                <h2>내비게이션 컴포넌트</h2>
            </nav>
            <div className='top'>
                <h2>상단 컴포넌트</h2>
            </div>
            <div className="middle1">
                <h2>중단1 컴포넌트</h2>
            </div>
            <div className="middle2">
                <h2>중단2 컴포넌트</h2>
            </div>
            <div className="bottom">
                <h2>하단 컴포넌트</h2>
            </div>

        </div>
    )
}

export default Home