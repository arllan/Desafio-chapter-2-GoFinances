import React, { useState } from 'react';
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { Input } from '../../Components/Forms/Input';
import { InputForm } from '../../Components/Forms/inputForm';
import { Button } from '../../Components/Forms/Button';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';


import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

interface FormData {
    name: string;
    amount: string;
}

// esquemas de validação do campos 
const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatorio'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatorio')
});

export function Register(){
    const [transactionType, setTransactionType] = useState(''); 
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeButton(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecionae o tipo da transação');
        
        if(category.key === 'category')
            return Alert.alert('Selecionae a categoria');
            
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    }
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                    <Header>
                        <Title>Cadastro</Title>
                    </Header>
                    <Form>
                        <Fields>
                            <InputForm
                                name="name"
                                control={control}
                                placeholder="Nome"
                                autoCapitalize="sentences"
                                autoCorrect={false}
                                error={errors.name && errors.name.message}
                            />
                            <InputForm
                                name="amount"
                                control={control}
                                placeholder="Preço"
                                keyboardType="numeric"
                                error={errors.amount && errors.amount.message}
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
                            <CategorySelectButton 
                                title={category.name}
                                onPress={handleOpenSelectCategoryModal}
                            />
                        </Fields>
                        <Button 
                            title="Enviar" 
                            onPress={handleSubmit(handleRegister)}
                        />
                    </Form>
                    <Modal visible={categoryModalOpen}>
                        <CategorySelect
                            category={category}
                            setCategory={setCategory}
                            closeSelectCategory={handleCloseSelectCategoryModal}
                        />
                    </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}