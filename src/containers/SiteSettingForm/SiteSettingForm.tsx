import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Grid, Row, Col } from 'components/FlexBox/FlexBox';
import { Form, FieldDetails } from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useQuery, gql } from '@apollo/client';
import { app } from '../../../src/base';

const options = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'turn-off', label: 'Down' },
];

const GET_SETTING = gql`
query setting($clientid: String!) {
  setting(where: {clientid: {_eq: $clientid}}) {
    status_shop
    site_name
    is_sound
    is_notification
    image_url
    id
    description
    creation_date
    clientid
  }
}  
`;


type Props = {clientid};
const SiteSettingsForm: React.FC<Props> = (clientid) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => console.log(data);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = React.useState('');

  const { data:data1, error} = useQuery(GET_SETTING,
    {
      variables: {
        clientid: sessionStorage.getItem('clientid')
      }
  });

  const handleMultiChange = ({ value }) => {

    setValue('reactSelect', value);
    setCategory(value);
  };
  const [imageURL, setImageURL] = useState(null);  
  const handleUploader = (files) => {
    setValue('reactDropzone', files);
  };
  React.useEffect(() => {
   /*  register({ name: 'reactSelect' });
    register({ name: 'reactDropzone' }); */
    setImageURL(data1 && data1.setting[0].image_url);
  }, [register]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if(file){
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file)
      console.log("Uploaded file " , file.name);
      console.log(JSON.stringify(await fileRef.getDownloadURL()));
      setImageURL(await fileRef.getDownloadURL());            
    }
   } 

 
  return (
    <Grid fluid={true}>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: 0 }}>
        <Row>
          <Col md={4}>
            <FieldDetails>Suba su logo aquí</FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <Uploader onChange={handleUploader} />
              <input  type="file" onChange={onFileChange} />
              <img width="100" height="100" src={imageURL}/>
            </DrawerBox>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FieldDetails>
             Agrega una información para su sitio
            </FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Nombre Sitio</FormLabel>
                <Input
                  value={data1 && data1.setting[0].site_name}
                  name="site_name"
                  inputRef={register}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Descripción Sitio</FormLabel>
                <Textarea
                  value={data1 && data1.setting[0].description  }
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Estado</FormLabel>
                <Select
                  options={options}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Elija el estado actual"
                  value={category}
                  searchable={false}
                  onChange={handleMultiChange}
                  overrides={{
                    Placeholder: {
                      style: ({ $theme }) => {
                        return {
                          ...$theme.typography.fontBold14,
                          color: $theme.colors.textNormal,
                        };
                      },
                    },
                    DropdownListItem: {
                      style: ({ $theme }) => {
                        return {
                          ...$theme.typography.fontBold14,
                          color: $theme.colors.textNormal,
                        };
                      },
                    },
                    OptionContent: {
                      style: ({ $theme, $selected }) => {
                        return {
                          ...$theme.typography.fontBold14,
                          color: $selected
                            ? $theme.colors.textDark
                            : $theme.colors.textNormal,
                        };
                      },
                    },
                    SingleValue: {
                      style: ({ $theme }) => {
                        return {
                          ...$theme.typography.fontBold14,
                          color: $theme.colors.textNormal,
                        };
                      },
                    },
                    Popover: {
                      props: {
                        overrides: {
                          Body: {
                            style: { zIndex: 5 },
                          },
                        },
                      },
                    },
                  }}
                />
              </FormFields>

              <FormFields>
                <Button
                  type="submit"
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        width: '50%',
                        marginLeft: 'auto',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderBottomLeftRadius: '3px',
                        borderBottomRightRadius: '3px',
                      }),
                    },
                  }}
                >
                  Enviar
                </Button>
              </FormFields>
            </DrawerBox>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};

export default SiteSettingsForm;
