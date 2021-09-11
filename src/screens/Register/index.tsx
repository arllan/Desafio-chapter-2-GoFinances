import React, { useState } from 'react';
import { Input } from '../../Components/Forms/Input';
import { Button } from '../../Components/Forms/Button';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';
import { CategorySelect } from '../../Components/Forms/CategorySelect';


import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

export function Register(){

    const [transactionType, setTransactionType] = useState(''); 

    function handleTransactionTypeButton(type: 'up' | 'down'){
        setTransactionType(type);
    }
    
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                    
                    <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeButton('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeButton('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsTypes>
                    <CategorySelect title="Categoria"/>
                </Fields>
                <Button title="Enviar"/>
            </Form>
        </Container>
    );
}