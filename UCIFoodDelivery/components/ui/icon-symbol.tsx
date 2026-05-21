import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color: string;
};

export function IconSymbol({
  name,
  size = 24,
  color,
}: Props) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
    />
  );
}