import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import React from 'react'

  interface ShadCardProps {
    title: string;
    description: string;
    content: string;
  }
  
  
  const ShadCard: React.FC<ShadCardProps> = ({ title, description, content }) => {
    return (
      <Card className="max-w-[600px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </Card>
    )
  }
  
  export default ShadCard;
  