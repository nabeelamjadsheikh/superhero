import { render, screen } from '@testing-library/react'
import { SuperheroList } from '@/components/SuperheroList'

describe('SuperheroList', () => {
  it('shows empty state when no superheroes are provided', () => {
    render(<SuperheroList superheroes={[]} />)
    
    expect(screen.getByText('No superheroes found.')).toBeInTheDocument()
    expect(screen.getByText('Add your first superhero above!')).toBeInTheDocument()
  })

  it('renders superhero list correctly', () => {
    const mockSuperheroes = [
      {
        id: 1,
        name: 'Test Hero',
        superpower: 'Testing',
        humilityScore: 7
      }
    ]

    render(<SuperheroList superheroes={mockSuperheroes} />)
    
    expect(screen.getByText('Test Hero')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('Score: 7')).toBeInTheDocument()
  })
}) 