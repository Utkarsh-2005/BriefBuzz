import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { motion, useInView } from 'framer-motion';

interface TopicCardProps {
    image: string | null | undefined;
    topic: string;
    description: string;
}

const DEFAULT_IMAGE = "https://cdn.pixabay.com/photo/2023/10/17/09/37/honey-bee-8320764_1280.jpg";

const TopicCard: React.FC<TopicCardProps> = ({ image, topic, description }) => {
    const imageSrc = image ?? DEFAULT_IMAGE;
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }} // Only opacity for initial state
            animate={isInView ? { opacity: 1 } : {}} // Only opacity for animation
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageSrc}
                        alt={topic}
                        onError={(event) => {
                            console.error("Error loading image:", event.currentTarget.src);
                            event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {topic}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

export default TopicCard;