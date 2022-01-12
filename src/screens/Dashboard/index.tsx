import React from 'react';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './style';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    
    const data: DataListProps[] = [
    {   
        id:'1',
        type: 'positive',
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
            name: 'Vendas',
            icon:'dollar-sign'
        },
        date:"13/04/2020"
    },
    {
        id:'2',
        type: 'negative',
        title:"Hamburgueria Pizzy",
        amount:"R$ 59,00",
        category:{
            name: 'Alimentação',
            icon:'coffee'
        },
        date:"10/04/2020"
    },
    {
        id:'3',
        type:'negative',
        title:"Aluguel do apartmento",
        amount:"R$ 1.200,00",
        category:{
            name: 'Casa',
            icon:'shopping-bag'
        },
        date:"10/04/2020"
    }];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={{uri: 'https://avatars.githubusercontent.com/u/6806338?v=4'}}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Rodrigo</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={()=>{}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard 
                    type="up"
                    title="Entradas" 
                    amount="R$ 17.400,00" 
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down" 
                    title="Saidas" 
                    amount="R$ 17.400,00" 
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="total" 
                    title="Total" 
                    amount="R$ 17.400,00" 
                    lastTransaction="Última entrada dia 13 de abril"
                />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> <TransactionCard data={item}/>}
                />
            </Transactions>
        </Container>
    );
}
