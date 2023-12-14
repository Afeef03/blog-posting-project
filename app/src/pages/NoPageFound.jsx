import React from 'react'

const NoPageFound = () => {
  return (
    <div className="container mt-5 error-comp">
    <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">No Page Found</h4>
        <p>Page not found. Please check the URL and try again.
        </p>
        <hr />
        <p className="mb-0">If the issue persists, contact support for assistance.
        </p>
    </div>
</div>
  )
}

export default NoPageFound
