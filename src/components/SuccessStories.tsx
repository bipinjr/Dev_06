import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';
import successStory1 from '@/assets/success-story-1.jpg';
import successStory2 from '@/assets/success-story-2.jpg';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const stories = [
  {
    image: successStory1,
    name: 'Bruno',
    type: 'Dog',
    location: 'Koramangala, Bangalore',
    story: 'Found malnourished and limping near Forum Mall. After 3 months of treatment and love, Bruno is now a healthy, playful dog living with his forever family in Indiranagar.',
    rescuer: 'CUPA Bangalore',
    adopter: 'Priya & Rahul',
    timeframe: 'Rescued → Adopted in 3 months',
  },
  {
    image: successStory2,
    type: 'Cat',
    name: 'Whiskers',
    location: 'BTM Layout, Bangalore',
    story: 'Whiskers was found with a chest wound behind a restaurant in BTM. After surgery and weeks of rehab at Charlie\'s CARE, she was adopted by a loving family in JP Nagar.',
    rescuer: "Charlie's CARE",
    adopter: 'Anitha M.',
    timeframe: 'Rescued → Adopted in 6 weeks',
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-background py-16">
      <div className="container">
        <motion.div {...fade} className="mb-10 text-center">
          <h2 className="mb-3 font-heading text-3xl font-bold md:text-4xl">
            <Heart className="mr-2 inline h-8 w-8 text-destructive" />
            Success Stories
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every rescue has a story. These animals went from distress to happiness thanks to our community.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {stories.map((story, i) => (
            <motion.div key={story.name} {...fade} transition={{ delay: 0.15 * i, duration: 0.5 }}>
              <Card className="overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={story.image} alt={`${story.name}'s rescue journey`} className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.type} • {story.location}</p>
                    </div>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      {story.timeframe}
                    </span>
                  </div>
                  <div className="relative rounded-lg bg-muted/50 p-4">
                    <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                    <p className="text-sm text-foreground italic">{story.story}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rescued by: <strong className="text-foreground">{story.rescuer}</strong></span>
                    <span>Adopted by: <strong className="text-foreground">{story.adopter}</strong></span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
