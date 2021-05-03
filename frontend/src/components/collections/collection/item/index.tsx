/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import {
  Box,
  Text,
  HStack,
  Flex,
  List,
  ListItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';

import cn from 'classnames';

import { MotionBox } from '../../../shared/motion-box';

import '../../styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface CollectionItemProps {
  collection: Collection;
  i: number;

  expandedCollection: number;
  setExpandedCollection: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSnippets: React.Dispatch<
    React.SetStateAction<Snippet[] | undefined>
  >;
  selectedSnippetId: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  i,
  expandedCollection,
  setExpandedCollection,
  setSelectedSnippets,
  selectedSnippetId,
  setHeading,
  setExpandedSnippet,
}) => {
  const isOpen = i === expandedCollection;
  const className = cn('accordion', {
    'accordion--open': isOpen,
    'accordion--next-to-open': i === expandedCollection - 1,
  });

  return (
    <>
      <Box bg={mode('#fff', '#141625')} className={className}>
        <Box
          as="header"
          _hover={{
            bg: mode('#f6f6f6', '#252945'),
          }}
          bg={
            isOpen
              ? mode('#f6f6f6', '#252945')
              : mode('#fff', '#141625')
          }
          onClick={() => {
            setExpandedCollection(isOpen ? 0 : i);
            setExpandedSnippet(0);
            setSelectedSnippets(collection.snippets);
            setHeading(collection.name);
          }}
        >
          <HStack>
            <Text>{collection.name}</Text>
          </HStack>
          <Box>
            <Text
              justifySelf="end"
              as="span"
              color="gray.600"
              fontSize="sm"
              mr="10px"
            >
              {collection.snippets.length} snips
            </Text>
            {isOpen ? (
              <MinusIcon fontSize="12px" />
            ) : (
              <AddIcon fontSize="12px" />
            )}
          </Box>
        </Box>

        <AnimatePresence initial={false}>
          {isOpen && (
            <MotionBox
              as="section"
              overflow="hidden"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: '0' },
              }}
              transition={{
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <Flex
                padding="10px"
                justifyContent="space-between"
                onClick={() =>
                  setExpandedCollection(isOpen ? -1 : i - 1)
                }
              >
                <Text as="span" color="gray.600" fontSize="sm">
                  Edit this collection
                </Text>
                <MinusIcon />
              </Flex>
              <List>
                {collection.snippets &&
                  collection.snippets.map((snippet, index) => (
                    <ListItem
                      key={`${index}-list-item-${collection._id}-snippet-${snippet._id}`}
                      cursor="pointer"
                      bg={
                        selectedSnippetId === snippet.title
                          ? mode('#f6f6f6', '#252945')
                          : 'none'
                      }
                      _hover={{
                        bg: mode('#f6f6f6', '#252945'),
                        borderRadius: '6px',
                      }}
                      onClick={() => {
                        setSelectedSnippets([snippet]);
                      }}
                    >
                      {snippet.title}
                    </ListItem>
                  ))}
              </List>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default CollectionItem;
