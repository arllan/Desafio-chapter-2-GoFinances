import React from "react";
import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LasTransaction,
} from './styles';

interface Props {
    title: string;
    amount: string;
    lastTransaction: string
    type: 'up' | 'down' | 'total'; // esse campo só pode ter essa três opções
}

// os icones com nome certos estão aqui 
const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard({type, title, amount, lastTransaction } : Props ){
    return(
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LasTransaction type={type}>{lastTransaction}</LasTransaction>
            </Footer>
        </Container>
    )
}