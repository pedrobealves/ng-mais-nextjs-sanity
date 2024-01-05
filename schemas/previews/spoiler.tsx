export const SpoilerIcon = () => <span style={{ fontWeight: 'bold' }}>S</span>

export const SpoilerDecorator = (props) => (
  <span style={{ backgroundColor: 'red' }}>{props.children}</span>
)
