import React from 'react';

export function renderInput_invitee({input, type, meta: {pristine, visited, error, touched}}){
    const hasError = touched && error;
    const showExample = pristine && visited;
    return (
        <div className={`form-group col-xs-2 ${hasError ? 'has-danger' : ''}`}>
            <input 
            {...input} 
            className={`form-control ${hasError ? 'form-control-danger' : ''}`}
            type={type ? type : 'text'} />
            <div>{showExample ? 'ex: test_email1@gmail.com, test_email2@gmail.com' : ''}</div>
            <div className="form-control-feedback">{hasError ? error : ''}</div>
        </div>
    )
}

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