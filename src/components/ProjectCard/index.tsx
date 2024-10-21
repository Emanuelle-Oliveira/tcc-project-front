import {Card, CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';
import Link from 'next/link';

interface ProjectCardProps {
  id: number;
  name: string;
  userId: number;
}

export default function ProjectCard({ id, name, userId } : ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} passHref>
      <Card
        sx={{
          width: 250,
          height: 150,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.primary.dark,
            }}
            align={'center'}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}