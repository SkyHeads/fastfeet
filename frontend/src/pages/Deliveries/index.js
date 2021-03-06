import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import api from '../../services/api';

import { createLetterAvatar } from '../../utils/letterAvatar';

import SearchInput from '../../components/SearchInput';
import Table from '../../components/Table';
import Actions from '../../components/Actions';
import LookDelivery from './LookDelivery';

import { deliveryStatus } from '../../styles/colors';

import { 
  Container,
  PageTitle,
  DeliverymanField, 
  Avatar, 
  LetterAvatar,
  DeliveryStatus
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [looking, setLooking] = useState(null);

  console.log(deliveries);
  
  const parseDeliveries = useCallback((data) => {
    return data.map((delivery, index) => {
      delivery.idText = 
        delivery.id > 9 ? `#${delivery.id}` : `#0${delivery.id}`;

        if (delivery.deliveryman) {
          delivery.deliveryman.letterAvatar = createLetterAvatar(
            delivery.deliveryman.name,
            index
          );
        }
        if (delivery.canceled_at)
        delivery.status = {
          color: deliveryStatus.canceled,
          text: 'CANCELADA',
        };
        else if (delivery.end_date)
          delivery.status = {
            color: deliveryStatus.delivered,
            text: 'ENTREGUE',
          };
        else if (delivery.start_date)
          delivery.status = {
            color: deliveryStatus.takeout,
            text: 'RETIRADA',
          };
        else {
          delivery.status = {
            color: deliveryStatus.pending,
            text: 'PENDENTE',
          };
        }

      return delivery;
    })
  }, [])

  const handleLook = useCallback((delivery) => {
    setLooking(delivery)
  }, [])

  async function handleSearch(search) {
    const response = await api.get(`/deliveries?q=${search}`);
    const data = parseDeliveries(response.data.rows);
    setDeliveries(data);
    setSearchText(search);
  }

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('/deliveries');

      const data = parseDeliveries(response.data.rows);
      setDeliveries(data);
    }

    loadDeliveries();
  }, [parseDeliveries]);

  return (
    <Container>
      <header>
        <PageTitle>Gerenciando encomendas</PageTitle>
      </header>
        <div>
          <SearchInput
            placeholder="Buscar por encomendas"
            callback={handleSearch}
          />
          <Link to="/deliveries">
            <MdAdd color="#FFFFFF" size={22} />
            Cadastrar
          </Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destin??tario</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>A????es</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(({ deliveryman, recipient, status, ...delivery }) => (
              <tr key={String(delivery.id)}>
                <td>{delivery.idText}</td>
                <td>{recipient?.name}</td>
                <DeliverymanField>
                  {deliveryman && (
                    <>
                      {deliveryman.avatar ? (
                        <Avatar src={deliveryman.avatar.url} />
                      ) : (
                        <LetterAvatar color={deliveryman?.letterAvatar.color}>
                          {deliveryman?.letterAvatar.letters}
                        </LetterAvatar>
                      )}

                      {deliveryman.name}
                    </>
                  )}
                </DeliverymanField>
                <td>{recipient?.city}</td>
                <td>{recipient?.state}</td>
                <td>
                <DeliveryStatus color={status.color}>
                  {status.text}
                </DeliveryStatus>
                </td>
                <td>
                  <Actions>
                    <button
                      type="button"
                      onClick={() => handleLook({ ...delivery, recipient })}
                    >
                      <MdRemoveRedEye size={22} color="#8e5be8"/>
                      <p>Visualizar</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                    >
                      <MdEdit size={22} color="#4D85EE"/>
                      <p>Editar</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                    >
                      <MdDeleteForever size={22} color="#DE3B3B" />
                      <p>Excluir</p>
                    </button>
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {looking && (
          <LookDelivery
            delivery={looking}
          />
        )}
    </Container>
  );
}
