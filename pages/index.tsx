import { AppLayout } from '@/layouts';
import { 
  StyledButton, StyledContainer, 
  StyledLabel, StyledIcon, StyledGrid, 
  StyledInput, StyledResult
} from '@/components/styled-components';
import { Dropdown, ShowResult } from '@/components';



export default function Home() {
  return (
    <AppLayout>
      <StyledContainer>
        <div>
          <StyledLabel htmlFor="amount">Amount</StyledLabel>
          <StyledInput type="text" name='amount' />
        </div> 

        <StyledGrid>
          <div>
            <StyledLabel>From</StyledLabel>
              <Dropdown />
          </div>
          
          <StyledIcon>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </StyledIcon>

          <div>
            <StyledLabel htmlFor='from'>To</StyledLabel>
            <Dropdown />
          </div>

        </StyledGrid>

        <StyledButton type='submit'>Convert</StyledButton>

        <ShowResult />

      </StyledContainer>
    </AppLayout>
  )
}
