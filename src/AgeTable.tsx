import { Avatar, List, Skeleton } from 'antd';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { getDetails, getPersonDetails, IMAGE_PATH } from './tmdb';
import {
  MovieCast,
  PersonDetails,
  SearchTypes,
  TheDetails,
  TVCast,
} from './tmdbTypes';
import { UserDeleteOutlined } from '@ant-design/icons';

type AgeProps = {
  info: SearchTypes | null;
};

type AgeListProps = {
  person: TVCast | MovieCast;
  dates: Moment[];
};
const AgeList = ({ person, dates }: AgeListProps) => {
  const [details, setDetails] = useState<PersonDetails | null>(null);
  useEffect(() => {
    (async () => {
      setDetails(await getPersonDetails(person.id));
    })();
  });
  let roles = '';
  if ('roles' in person && person.roles) {
    roles = person.roles
      .map((r) => `${r.character} (${r.episode_count} Episodes)`)
      .join(', ');
  } else if ('character' in person && person.character) {
    roles = person.character;
  }

  const birthday = moment(details?.birthday);
  const compareDate = details?.deathday ? moment(details.deathday) : moment();
  const currentAge = compareDate.diff(birthday, 'years');
  const title = `${details?.name} (${currentAge})`;

  let ages = '';
  if (dates.length >= 1) ages += dates[0].diff(birthday, 'years');
  if (dates.length >= 2) ages += ' - ' + dates[1].diff(birthday, 'years');

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={details ? false : true} active>
        <List.Item.Meta
          avatar={
            <Avatar
              src={`${IMAGE_PATH}/${details?.profile_path}`}
              shape="square"
              size="large"
            />
          }
          title={
            <>
              {title}
              {details?.deathday ? <UserDeleteOutlined /> : null}
            </>
          }
          description={roles}
        />
        <div>
          AGE WHEN FILMED:
          <br /> {ages}
        </div>
      </Skeleton>
    </List.Item>
  );
};

const AgeTable = ({ info }: AgeProps) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<TheDetails | null>(null);

  useEffect(() => {
    if (info) {
      (async () => {
        setDetails(await getDetails(info));
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [info, setLoading]);

  if (details === null && !loading) return <>An issue occured...</>;
  return (
    <List
      loading={loading}
      dataSource={details?.cast.slice(0, 10)}
      renderItem={(person) => (
        <AgeList person={person} dates={details?.dates || []} />
      )}
    ></List>
  );
};

export default AgeTable;
