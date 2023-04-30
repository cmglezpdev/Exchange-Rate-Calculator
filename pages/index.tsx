import styles from '@/styles/Home.module.css'
import { AppLayout } from '@/layouts'
import { 
  Button, Container, Dropdown, 
  Label, Option, Icon, Grid, 
  Input 
} from '@/components/styled-components'



export default function Home() {
  return (
    <AppLayout>
      <Container>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input type="text" name='amount' />
        </div> 

        <Grid>
          <div>
            <Label htmlFor='from'>From:</Label>
            <Dropdown name='from'>
              <Option>HOLA</Option>
              <Option>MUNDO</Option>
            </Dropdown>
          </div>
          
          <Icon>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </Icon>

          <div>
            <Label htmlFor='from' className={styles.label}>To:</Label>
            <Dropdown name='from'>
              <Option>HOLA</Option>
              <Option>MUNDO</Option>
            </Dropdown>
          </div>

        </Grid>

        <Button type='submit'>Convert</Button>
      </Container>
    </AppLayout>
  )
}
