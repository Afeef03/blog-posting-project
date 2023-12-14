import React from 'react'

const Error = () => {
    return (
        <div className="container mt-5 error-comp">
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">An error occurred</h4>
                <p>Oops! Something went wrong. Please try again or contact support.
                </p>
                <hr />
                <p className="mb-0">Sorry, an issue happened. Retry or seek assistance.
                </p>
            </div>
        </div>
    )
}

export default Error
