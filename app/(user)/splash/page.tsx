'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { images } from './images'
import { useState } from 'react'
import LinkButton from './linkButton'

const variants = {
    entry: (back: boolean) => ({
        x: back ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5 },
    },
    exit: (back: boolean) => ({
        x: back ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: { duration: 0.5 },
    }),
}

const wrap = (min_val: number, max_val: number, value: number) => {
    const range_size = max_val - min_val
    return (((value - min_val) % range_size) + min_val) % range_size
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
}

const SplashPage = () => {
    const [[page, direction], setPage] = useState([0, 0])
    //박스마다 이미지 적용
    const imageIndex = wrap(0, images.length, page)

    const paginate = (newDirection: number) => {
        if (page === 0 && newDirection === -1) {
            return
        }
        setPage([page + newDirection, newDirection])
    }
    const handleClick = (n: number) => {
        setPage([n, 0])
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <svg
                    width="18"
                    height="80"
                    onClick={() => {
                        handleClick(0)
                    }}
                >
                    <circle
                        cx="5"
                        cy="40"
                        r="5"
                        className={`${wrap(0, images.length, page) === 0 ? 'fill-red-500' : 'fill-black'}`}
                    ></circle>
                </svg>
                <svg
                    width="18"
                    height="80"
                    onClick={() => {
                        handleClick(1)
                    }}
                >
                    <circle
                        cx="5"
                        cy="40"
                        r="5"
                        className={`${wrap(0, images.length, page) === 1 ? 'fill-red-500' : 'fill-black'}`}
                    ></circle>
                </svg>
                <svg
                    width="18"
                    height="80"
                    onClick={() => {
                        handleClick(2)
                    }}
                >
                    <circle
                        cx="5"
                        cy="40"
                        r="5"
                        className={`${wrap(0, images.length, page) === 2 ? 'fill-red-500' : 'fill-black'}`}
                    ></circle>
                </svg>
            </div>

            <AnimatePresence initial={false} custom={direction}>
                <motion.div className="flex flex-col justify-center items-center overflow-hidden">
                    <motion.div
                        className="flex flex-col not-italic font-normal text-2xl leading-8"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    >
                        {`${images[imageIndex].f_description}`}
                        <br></br>
                        <b>{`${images[imageIndex].s_description}`}</b>
                    </motion.div>
                    <motion.img
                        key={imageIndex}
                        src={`${images[imageIndex].src}`}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="mt-4 w-96 ml-13"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x)
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1)
                            }
                        }}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="ml-16">
                <LinkButton></LinkButton>
            </div>
        </>
    )
}

export default SplashPage
