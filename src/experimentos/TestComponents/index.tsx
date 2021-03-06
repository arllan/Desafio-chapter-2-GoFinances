import React from 'react';

import { ComponentProps } from '../Test/componentProps';
import { ComponentPropsStyled } from '../Test/componentPropsStyled';

export function TestComponents(){
    const alert = (val: string) => {
        console.log(val);
    }


    return(
        <>
            <ComponentPropsStyled title="Titulo" onPress={()=>{alert('Clicado Titulo')}}/>
            <ComponentProps title="Olá mundo" onPress={()=>{alert('Clicado Olá mundo')}} fontSize="big" width="big"/>
        </>
    );
}