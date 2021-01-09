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
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { AvatarProps } from 'antd/lib/avatar';

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
    getPersonDetails(person.id).then((d) => setDetails(d));
  }, [person, setDetails]);
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

  const avatarOptions: AvatarProps = {
    shape: 'square',
    size: 'large',
  };
  if (details?.profile_path) {
    avatarOptions.src = `${IMAGE_PATH}/${details?.profile_path}`;
  } else {
    avatarOptions.icon = <UserOutlined />;
  }

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={details ? false : true} active>
        <List.Item.Meta
          avatar={<Avatar {...avatarOptions} />}
          title={
            <>
              {title.replace('(NaN)', '(?)')}
              {details?.deathday ? <UserDeleteOutlined /> : null}
            </>
          }
          description={roles}
        />
        <div>
          AGE WHEN FILMED:
          <br /> {ages === 'NaN - NaN' ? '?' : ages}
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
      getDetails(info).then((d) => {
        setDetails(d);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [info, setLoading, setDetails]);

  if (details === null && !loading) return <>An issue occured...</>;
  return (
    <List
      loading={loading}
      dataSource={details?.cast}
      pagination={{
        pageSize: 10,
      }}
      renderItem={(person) => (
        <AgeList person={person} dates={details?.dates || []} />
      )}
    ></List>
  );
};

export default AgeTable;
