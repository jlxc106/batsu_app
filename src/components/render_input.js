import React from 'react';


export function renderInput({input, type, meta: {error, touched}}){
    const hasError = touched && error;
    return (
        <div className={`form-group col-xs-2 ${hasError ? 'has-danger' : ''}`}>
            <input 
            {...input} 
            className={`form-control ${hasError ? 'form-control-danger' : ''}`}
            type={type ? type : 'text'} />
            <div className="form-control-feedback">{hasError ? error : ''}</div>
        </div>
    )
}