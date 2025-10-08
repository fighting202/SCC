"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FadeIn, 
  StaggerChildren, 
  HoverScale, 
  SlideIn, 
  Parallax,
  animationPresets 
} from './index'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Heart, 
  Star, 
  Zap, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

export function AnimationDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const demoItems = [
    { icon: Sparkles, title: 'Fade In', description: 'Smooth fade in effect' },
    { icon: Heart, title: 'Hover Scale', description: 'Interactive hover animation' },
    { icon: Star, title: 'Slide In', description: 'Directional slide animation' },
    { icon: Zap, title: 'Stagger', description: 'Sequential children animation' }
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            SCC Animation System Demo
          </CardTitle>
          <CardDescription>
            Framer Motion을 사용한 SCC 전용 애니메이션 컴포넌트들을 테스트해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 컨트롤 버튼 */}
          <div className="flex gap-2">
            <Button onClick={triggerAnimation} disabled={isPlaying}>
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Playing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play All Animations
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setAnimationKey(0)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Fade In 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fade In Animation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoItems.map((item, index) => (
                <FadeIn 
                  key={`fade-${animationKey}-${index}`}
                  delay={index * 0.1}
                  className="w-full"
                >
                  <HoverScale>
                    <Card className="cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverScale>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Stagger Children 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stagger Children Animation</h3>
            <StaggerChildren 
              key={`stagger-${animationKey}`}
              delay={0.2}
              staggerDelay={0.1}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <Card key={num}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="h-6 w-6 text-accent" />
                      </div>
                      <h4 className="font-semibold">Item {num}</h4>
                      <p className="text-sm text-muted-foreground">
                        Staggered animation
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerChildren>
          </div>

          {/* Slide In 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Slide In Animations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SlideIn 
                key={`slide-left-${animationKey}`}
                direction="left"
                delay={0.5}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ArrowRight className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-medium">Slide from Left</h4>
                        <p className="text-sm text-muted-foreground">
                          Smooth left-to-right animation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              <SlideIn 
                key={`slide-right-${animationKey}`}
                direction="right"
                delay={0.6}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ArrowRight className="h-6 w-6 text-primary rotate-180" />
                      <div>
                        <h4 className="font-medium">Slide from Right</h4>
                        <p className="text-sm text-muted-foreground">
                          Smooth right-to-left animation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>

          {/* Hover Scale 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hover Scale Animation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Small', 'Medium', 'Large'].map((size, index) => (
                <HoverScale 
                  key={`hover-${index}`}
                  scale={1.02 + index * 0.03}
                >
                  <Card className="cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold">{size} Scale</h4>
                      <p className="text-sm text-muted-foreground">
                        Hover to see effect
                      </p>
                    </CardContent>
                  </Card>
                </HoverScale>
              ))}
            </div>
          </div>

          {/* 애니메이션 프리셋 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Animation Presets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(animationPresets).map(([name, preset], index) => (
                <motion.div
                  key={`preset-${animationKey}-${index}`}
                  {...preset}
                  className="w-full"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{name}</Badge>
                        <div>
                          <h4 className="font-medium capitalize">
                            {name.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Predefined animation
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Parallax 데모 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parallax Effect</h3>
            <div className="h-32 overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
              <Parallax speed={0.5}>
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-lg font-semibold">Parallax Scroll Effect</p>
                    <p className="text-sm text-muted-foreground">
                      Scroll to see the parallax effect
                    </p>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
