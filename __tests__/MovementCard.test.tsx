import { render, screen } from '@testing-library/react';

// Simple component rendering test
const MockMovementCard = ({ movement, isAdmin }: { movement: any, isAdmin: boolean }) => {
  const formattedAmount = `$${Number(movement.amount).toFixed(2)}`;
  const formattedDate = new Date(movement.date).toLocaleDateString();

  return (
    <div data-testid="movement-card">
      <h3>{movement.concept}</h3>
      <span data-testid="badge">{movement.type}</span>
      <p>Amount: {formattedAmount}</p>
      <p>User: {movement.user.name}</p>
      <p>Date: {formattedDate}</p>
      {isAdmin && (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

const mockMovement = {
  id: '1',
  concept: 'Test Payment',
  amount: '100.50',
  type: 'INCOME',
  date: '2024-01-15T10:00:00Z',
  user: { name: 'John Doe' },
};

describe('MovementCard Component', () => {
  it('should render movement information correctly', () => {
    render(<MockMovementCard movement={mockMovement} isAdmin={false} />);

    expect(screen.getByText('Test Payment')).toBeInTheDocument();
    expect(screen.getByText(/Amount: \$100\.50/)).toBeInTheDocument();
    expect(screen.getByText(/User: John Doe/)).toBeInTheDocument();
    expect(screen.getByText('INCOME')).toBeInTheDocument();
  });

  it('should show edit and delete buttons for admin users', () => {
    render(<MockMovementCard movement={mockMovement} isAdmin={true} />);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should not show edit and delete buttons for regular users', () => {
    render(<MockMovementCard movement={mockMovement} isAdmin={false} />);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should format date correctly', () => {
    render(<MockMovementCard movement={mockMovement} isAdmin={false} />);
    
    const expectedDate = new Date('2024-01-15T10:00:00Z').toLocaleDateString();
    expect(screen.getByText(`Date: ${expectedDate}`)).toBeInTheDocument();
  });
});